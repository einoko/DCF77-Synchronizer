import { isDST, BCD, evenParity } from "./helpers";

/**
 * Returns the DCF77 signal for the current minute of a given Date object.
 * The signal is documented here: https://en.wikipedia.org/wiki/DCF77#Time_code_interpretation
 * @param time Date object
 * @returns DCF77 signal for the current minute (End bit marked as "!")
 */
export const DCF77Minute = (time: Date): string => {
  let signal: string = "";

  // (:0) Start of minute, always 0
  signal += "0";

  // (:01-:14) Civil warning bits (not implemented)
  signal += "11111111100000";

  // (:15) Call bit (not implemented)
  signal += "0";

  // (:16) Summer time announcement (not implemented)
  signal += "0";

  // (:17) CEST
  signal += isDST(time) ? "1" : "0";

  // (:18) CET
  signal += isDST(time) ? "0" : "1";

  // (:19) Leap second announcement (not implemented)
  signal += "0";

  // (:20) Start of encoded time, always 1
  signal += "1";

  // (:21-:28) Minutes (BCD) + even parity
  const minuteBits = BCD(time.getMinutes(), 7);
  signal += minuteBits;
  signal += evenParity(minuteBits);

  // (:29-:35) Hours (BCD) + even parity
  const hourBits = BCD(time.getHours(), 6);
  signal += hourBits;
  signal += evenParity(hourBits);

  // (:36-:41) Day of month (BCD)
  const dayBits = BCD(time.getDate(), 6);
  signal += dayBits;

  // (:42-:44) Day of week (BCD), 1-7 = Monday-Sunday
  const dayOfWeekBits = BCD(time.getDay() + 1, 3);
  signal += dayOfWeekBits;

  // (:45-:49) Month (BCD)
  const monthBits = BCD(time.getMonth() + 1, 5);
  signal += monthBits;

  // (:50-:57) Year within century (BCD)
  const yearBits = BCD(time.getFullYear() % 100, 8);
  signal += yearBits;

  // (:58) Parity over date bits 36-58
  signal += evenParity(dayBits + dayOfWeekBits + monthBits + yearBits);

  // (:59) Special end minute mark; no amplitude modulation, marked as "!" here
  signal += "!";

  return signal;
};
