import { dateFormat } from "./utils";

test("formats time and date correctly", () => {
  expect(dateFormat("2019-03-04T13:36:36Z")).toBe("2019-03-04");
  expect(dateFormat("2019-01-15T00:56:02Z")).toBe("2019-01-15");
  expect(dateFormat("2029-01-15T00:56:02Z")).toBe("2029-01-15");
});
