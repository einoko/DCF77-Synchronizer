import { useEffect, useState } from "react";
import { getDETime, isDST } from "../lib/helpers";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<Date>(getDETime());
  const dst: boolean = isDST(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getDETime());
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center pt-6 text-slate-700">
      <div className="text-center text-slate-900 dark:text-slate-200">
        <p className="font-semibold">Current DCF77 Time</p>
        <p>
          {time.toLocaleString("en-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          ({dst ? "CEST" : "CET"})
        </p>
        <p className="tabular-nums">
          {time.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default DigitalClock;
