import { useState } from "react";
import DCF77Player from "../lib/signal_player";

const TransmissionButton: React.FC = () => {
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [player, setPlayer] = useState<DCF77Player>(new DCF77Player());

  return (
    <>
      <button
        onClick={() => {
          if (isTransmitting) {
            player.stopSignal();
            setPlayer(new DCF77Player());
          } else {
            player.playSignal();
          }
          setIsTransmitting(!isTransmitting);
        }}
        className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-500/40 dark:hover:bg-slate-500/50 text-white font-semibold text-sm py-3 px-4 w-full mt-4 transition duration-200 rounded"
      >
        {isTransmitting ? "STOP TRANSMISSION" : "START TRANSMISSION"}
      </button>
      {!isTransmitting && (
        <div className="text-center pt-4">
          <p className="text-sm text-slate-900 dark:text-slate-100/50">
            Warning! This will transmit a high-pitched 15.5 kHz signal. Protect
            your hearing!
          </p>
        </div>
      )}
    </>
  );
};

export default TransmissionButton;
