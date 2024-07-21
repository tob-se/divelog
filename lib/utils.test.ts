import { expect, test } from "vitest";
import { getNextDiveTime, todayWithoutTimezone } from "./utils";

const today = todayWithoutTimezone();

test("next dive time is noon", () => {
  const diveTime = getNextDiveTime(today, "morning");

  expect(diveTime).toBe("noon");
});

test("next dive time is afternoon", () => {
  const diveTime = getNextDiveTime(today, "noon");

  expect(diveTime).toBe("afternoon");
});

test("next dive time is night", () => {
  const diveTime = getNextDiveTime(today, "afternoon");

  expect(diveTime).toBe("night");
});

test("next dive time is morning", () => {
  const diveTime = getNextDiveTime(today, "night");

  expect(diveTime).toBe("morning");
});

test("next dive time is morning when date is in the past", () => {
  const diveTime = getNextDiveTime("2024-01-01", "morning");

  expect(diveTime).toBe("morning");
});
