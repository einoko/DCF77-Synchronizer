/**
 * Returns the current time in Europe/Berlin timezone (same as DCF77)
 * @returns Date object
 */
export const getDETime = (): Date => {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Europe/Berlin",
    })
  );
};

/**
 * Checks if a given date is in CET or CEST
 * @param date Date object
 * @returns true if CEST, false if CET
 */
export const isDST = (date: Date): boolean => {
  const jan: Date = new Date(date.getFullYear(), 0, 1);
  const jul: Date = new Date(date.getFullYear(), 6, 1);
  return (
    Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) ===
    date.getTimezoneOffset()
  );
};

/**
 * Adds n minutes to a Date object
 * @param date Date object
 * @param minutes Number of minutes to add
 * @returns Date object
 */
export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60_000);
};

/**
 * Calculates even parity bit for a given binary string
 * @param input Binary string
 * @returns "0" if even, "1" if odd
 */
export const evenParity = (input: string): string => {
  return String((input.match(/1/g) || []).length % 2);
};

/**
 * Convert number to DCF77-compatible BCD
 * @param input Input number in base 10
 * @param size Number of bits to use
 * @returns DCF77-compatible BCD code
 */
export const BCD = (input: number, size: number): string => {
  const result: string[] = [];
  let remaining_input = input;

  for (let i = size - 1; i >= 0; i--) {
    // Weight formula courtesy of M. F. Hasler at https://oeis.org/A004655
    const weight = 2 ** (i % 4) * 10 ** Math.floor(i / 4);
    if (remaining_input - weight >= 0) {
      remaining_input -= weight;
      result.push("1");
    } else {
      result.push("0");
    }
  }

  return result.reverse().join("");
};
