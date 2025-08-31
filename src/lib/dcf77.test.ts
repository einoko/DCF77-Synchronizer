import { DCF77Minute } from "./dcf77";
import { BCD } from "./helpers";

describe("DCF77Minute", () => {
  it("signal should be 60 characters long #1", () => {
    const date = new Date(2020, 0, 1, 12, 0);
    const minute = DCF77Minute(date);
    expect(minute.length).toEqual(60);
  });
  it("signal should be 60 characters long #2", () => {
    const date = new Date(2023, 4, 2, 6, 24);
    const minute = DCF77Minute(date);
    expect(minute.length).toEqual(60);
  });
  it("signal should be 60 characters long #3", () => {
    const date = new Date(1995, 1, 6, 1, 14);
    const minute = DCF77Minute(date);
    expect(minute.length).toEqual(60);
  });
  it("signal should end with a !", () => {
    const date = new Date(2020, 0, 1, 12, 0);
    const minute = DCF77Minute(date);
    expect(minute[minute.length - 1]).toEqual("!");
  });
  it("should correctly encode day of month (August 31st test case)", () => {
    const date = new Date(2025, 7, 31, 12, 0);
    const minute = DCF77Minute(date);

    const dayBits = minute.substring(36, 42);
    const expectedDayBits = BCD(31, 6);

    expect(dayBits).toEqual(expectedDayBits);
  });
});
