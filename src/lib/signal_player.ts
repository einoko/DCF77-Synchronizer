// Create DCF77Player class

import { DCF77Minute } from "./dcf77";
import { addMinutes, getDETime } from "./helpers";

class DCF77Player {
  audioCtx: AudioContext;
  frequency = 77_500 / 5;
  currentMinute = new Float32Array();
  nextMinute = new Float32Array();
  ZERO: number[] = [];
  ONE: number[] = [];
  END: number[] = [];

  private createMinute(n: number): Float32Array {
    const DETime: Date = addMinutes(getDETime(), n);
    const sequence: string = DCF77Minute(DETime);
    const minute: Float32Array = new Float32Array(
      this.audioCtx.sampleRate * 60
    );

    sequence.split("").forEach((bit: string, i: number) => {
      switch (bit) {
        case "0":
          minute.set(this.ZERO, this.audioCtx.sampleRate * i);
          break;
        case "1":
          minute.set(this.ONE, this.audioCtx.sampleRate * i);
          break;
        case "!":
          minute.set(this.END, this.audioCtx.sampleRate * i);
      }
    });

    return minute;
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
        second[i] = 0;
      } else {
        second[i] = this.sine(i, this.frequency);
      }
    }
    return second;
  }

  private playMinute(minute: Float32Array): void {
    const buffer: AudioBuffer = this.audioCtx.createBuffer(
      1,
      minute.length,
      this.audioCtx.sampleRate
    );
    buffer.copyToChannel(minute, 0);

    const source: AudioBufferSourceNode  = this.audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioCtx.destination);
    source.start(0);
    source.onended = () => {
      this.currentMinute = this.nextMinute;
      this.playMinute(this.currentMinute);
      setTimeout(this.createNextMinute, 5000);
    };
  }

  private createNextMinute = (): void => {
    this.nextMinute = this.createMinute(2);
  };

  constructor() {
    this.audioCtx = new AudioContext();
    this.ZERO = this.createSecond(0.1);
    this.ONE = this.createSecond(0.2);
    this.END = this.createSecond(0.0);
  }

  public async playSignal(): Promise<void> {
    this.currentMinute = this.createMinute(1);
    this.nextMinute = this.createMinute(2);

    await new Promise((r) =>
      setTimeout(r, 1000 - new Date().getMilliseconds())
    );

    this.playMinute(
      this.currentMinute.slice(
        new Date().getSeconds() * this.audioCtx.sampleRate
      )
    );
  }

  public stopSignal(): void {
    this.audioCtx.close();
  }
}

export default DCF77Player;
