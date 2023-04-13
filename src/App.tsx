import AnalogClock from "./components/AnalogClock";
import DigitalClock from "./components/DigitalClock";
import TransmissionButton from "./components/TransmissionButton";
import { isDST, getDETime } from "./lib/helpers";

function App() {
  const dst: boolean = isDST(getDETime());

  return (
    <div className="min-h-screen min-w-full bg-[#fafafa] dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto pt-8 sm:pt-16 md:pt-32 px-4 pb-16">
        <div className="mb-5">
          <h1 className="font-bold text-4xl text-slate-900 dark:text-slate-100">
            DCF77 Synchronizer
          </h1>
          <span className="text-slate-800 text-sm font-regular dark:text-slate-200">
            Synchronize DCF77 clocks in your browser
          </span>
        </div>
        <div className="flex flex-col-reverse sm:flex-row">
          <section className="sm:w-1/2 text-justify hyphens-auto space-y-5 prose dark:prose-invert prose-slate leading-normal text-slate-900 dark:text-slate-100">
            <p>
              DCF77 Synchronizer is a{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://en.wikipedia.org/wiki/DCF77"
              >
                DCF77
              </a>{" "}
              time signal simulator written in JavaScript, using Web Audio API.
              You can use this web page to synchronize your
              DCF77-radio-controlled clock or watch.
            </p>
            <ol className="leading-normal text-left">
              <li>
                Click <b>START TRANSMISSION</b>.
              </li>
              <li>
                Set your radio controlled clock or watch to “receive” mode and
                place it near a speaker or a pair of headphones.
              </li>
              <li>
                It should take a few minutes at most for your watch to
                synchronize.
              </li>
              <ul>
                <li>
                  <b>TIP:</b> If you cannot get it to work, try increasing the
                  volume.
                </li>
              </ul>
            </ol>
            <p>
              The transmitted signal is automatically in the correct timezone (
              {dst ? "CEST" : "CET"}; UTC+{dst ? 2 : 1}). As the real DCF77
              signal is transmitted at a frequency of 77.5 kHz, speakers will
              not be able to reproduce it. Therefore, the fifth harmonic of a
              15.5 kHz signal (15.5 kHz × 5 = 77.5 kHz) is used to simulate the
              real signal.
            </p>
            <p>
              This signal has been successfully tested on a Casio Wave Ceptor
              watch and a radio controlled wall clock. The best results were had
              with an iPhone speaker, or a pair of headphones (most headphone
              brands should work), with volume set to about 80–100%.
            </p>
            <p className="pt-4 text-slate-900 dark:text-slate-100 font-semibold">
              This project was inspired by these resources:
            </p>
            <ul className="leading-tight">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="http://jjy.831337.xyz/"
                >
                  JJY.js
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://bastianborn.de/radio-clock-hack"
                >
                  How to manipulate a radio controlled clock via speaker by
                  Bastian Born
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="http://0x7.ch/text/dcf77.pdf"
                >
                  Cheating Time - How to build your own DCF77 transmitter (.pdf)
                </a>
              </li>
            </ul>
            <p>
              <b>Project source on GitHub</b>
            </p>
            <ul>
              <li>
                <a
                  className="font-regular"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/einoko/dcf77-synchronizer"
                >
                  https://github.com/einoko/dcf77-synchronizer
                </a>
              </li>
            </ul>
          </section>
          <aside className="sm:w-1/2">
            <div className="py-10 sm:py-2 w-52 mx-auto">
              <AnalogClock />
              <DigitalClock />
              <TransmissionButton />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
