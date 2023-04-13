import { addMinutes, evenParity, BCD, isDST } from "./helpers";

describe("addMinutes", () => {
  it("should add minutes to a date", () => {
    const date = new Date(2020, 0, 1, 12, 0);
    const result = addMinutes(date, 30);
    expect(result).toEqual(new Date(2020, 0, 1, 12, 30));
  });
});

describe("evenParity", () => {
  it("should return 1 if the input has an odd number of 1s", () => {
    expect(evenParity("1100100")).toEqual("1");
  });
  it("should return 0 if the input has an even number of 1s", () => {
    expect(evenParity("011110")).toEqual("0");
  });
});

describe("BCD", () => {
  it("should convert a number to binary coded decimal", () => {
    expect(BCD(31, 7)).toEqual("1000110");
  });
  it("should convert a number to binary coded decimal", () => {
    expect(BCD(7, 6)).toEqual("111000");
  });
  it("should convert a number to binary coded decimal", () => {
    expect(BCD(23, 6)).toEqual("110001");
  });
  it("should convert a number to binary coded decimal", () => {
    expect(BCD(99, 8)).toEqual("10011001");
  });
});

describe("isDST", () => {
  it("should return true if the date is in daylight savings time", () => {
    const date = new Date(2020, 6, 1);
    expect(isDST(date)).toEqual(true);
  });
  it("should return false if the date is not in daylight savings time", () => {
    const date = new Date(2020, 0, 1);
    expect(isDST(date)).toEqual(false);
  });
});
