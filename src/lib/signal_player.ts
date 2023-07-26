import { DCF77Minute } from "./dcf77";
import { addMinutes, getDETime } from "./helpers";

class DCF77Player {
  private audioCtx: AudioContext;
  private frequency = 77_500 / 5;
  private blockLengthMinutes = 10;
  private currentBlock = new Float32Array();
  private nextBlock = new Float32Array();
  private ZERO: number[] = [];
  private ONE: number[] = [];
  private END: number[] = [];

  private createBlock(n: number): Float32Array {
    const block: Float32Array = new Float32Array(
      this.audioCtx.sampleRate * 60 * this.blockLengthMinutes
    );
    for (let j = 0; j < this.blockLengthMinutes; j++) {
      const DETime: Date = addMinutes(getDETime(), n + j);
      const sequence: string = DCF77Minute(DETime);

      sequence.split("").forEach((bit: string, i: number) => {
        const offset = j * this.audioCtx.sampleRate * 60;
        switch (bit) {
          case "0":
            block.set(this.ZERO, offset + this.audioCtx.sampleRate * i);
            break;
          case "1":
            block.set(this.ONE, offset + this.audioCtx.sampleRate * i);
            break;
          case "!":
            block.set(this.END, offset + this.audioCtx.sampleRate * i);
        }
      });
    }
    return block;
  }

  private sine(sampleNumber: number, frequency: number): number {
    const distorter = this.audioCtx.sampleRate / 3;
    const sampleFreq = this.audioCtx.sampleRate / frequency;
    return (
      Math.floor(
        Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2))) * distorter
      ) / distorter
    );
  }

  private createSecond(ampMod: number): number[] {
    const second: number[] = [];

    for (let i = 0; i < this.audioCtx.sampleRate; i++) {
      if (i / this.audioCtx.sampleRate < ampMod) {
        second[i] = this.sine(i, this.frequency) * 0.25;
      } else {
        second[i] = this.sine(i, this.frequency);
      }
    }
    return second;
  }

  private async playBlock(
    block: Float32Array,
    playTimestamp: number = 0
  ): Promise<void> {
    const buffer: AudioBuffer = this.audioCtx.createBuffer(
      1,
      block.length,
      this.audioCtx.sampleRate
    );

    buffer.copyToChannel(block, 0);

    const source: AudioBufferSourceNode = this.audioCtx.createBufferSource();
    source.buffer = buffer;

    // Filter (https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)
    const filter: BiquadFilterNode = this.audioCtx.createBiquadFilter();
    filter.type = "lowshelf";
    filter.frequency.value = 15_000;
    filter.gain.value = -20;

    // Gain (https://developer.mozilla.org/en-US/docs/Web/API/GainNode)
    const gain: GainNode = this.audioCtx.createGain();
    gain.gain.value = 1.0;

    // Connect source -> filter -> gain -> destination
    // If you want to bypass both filter and gain, just use source.connect(this.audioCtx.destination)
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    // Here we time the playback to start at the correct second
    const offset: number = (new Date().getTime() - playTimestamp) / 1000;
    const offsetSeconds: number = Math.floor(offset);
    const offsetRemainingMilliseconds: number = Math.abs(
      offset - offsetSeconds
    );

    // Wait for the next second to start
    await new Promise((resolve) =>
      setTimeout(resolve, offsetRemainingMilliseconds * 1000)
    );
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 - new Date().getMilliseconds())
    );

    source.start(
      0,
      new Date().getSeconds() - new Date(playTimestamp).getSeconds()
    );

    // When the block is finished playing, play the next block, and create the block after that
    source.onended = () => {
      this.currentBlock = this.nextBlock;
      this.playBlock(this.currentBlock);
      setTimeout(this.createNextBlock, 5000);
    };
  }

  private createNextBlock = (): void => {
    this.nextBlock = this.createBlock(this.blockLengthMinutes + 1);
  };

  constructor() {
    this.audioCtx = new AudioContext({ sampleRate: 44_100 });
    this.ZERO = this.createSecond(0.1);
    this.ONE = this.createSecond(0.2);
    this.END = this.createSecond(0.0);
  }

  public playSignal(): void {
    // Timestamp of user clicking the play button
    const playTimestamp: number = new Date().getTime();

    // Two 10-minute signal blocks are created
    this.currentBlock = this.createBlock(1);
    this.nextBlock = this.createBlock(this.blockLengthMinutes + 1);

    // The beginning of the first block is skipped based on the current second of the minute
    this.playBlock(
      this.currentBlock.slice(
        new Date().getSeconds() * this.audioCtx.sampleRate
      ),
      playTimestamp
    );
  }

  public stopSignal(): void {
    this.audioCtx.close();
  }
}

export default DCF77Player;
