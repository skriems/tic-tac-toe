import { test, expect, describe } from "vitest";
import { createBoardHistory } from "./createBoardHistory";

describe("createBoardHistory", () => {
  test("handles two subsequent rows", () => {
    expect(createBoardHistory("x:0,o:1")).toEqual([
      ["x", null, null, null, null, null, null, null, null],
      ["x", "o", null, null, null, null, null, null, null],
    ]);
  });

  test("handles three subsequent rows", () => {
    expect(createBoardHistory("x:0,o:1,X:2")).toEqual([
      ["x", null, null, null, null, null, null, null, null],
      ["x", "o", null, null, null, null, null, null, null],
      ["x", "o", "x", null, null, null, null, null, null],
    ]);
  });

  test("handles uppercase characters", () => {
    expect(createBoardHistory("X:0,O:1")).toEqual([
      ["x", null, null, null, null, null, null, null, null],
      ["x", "o", null, null, null, null, null, null, null],
    ]);
  });

  test.each(["x:0,o:0", "x:1,o:1", "o:0, x:0", "o:0,x:1,O:2,x:2"])(
    "throws invalid board state",
    (input) => {
      expect(() => createBoardHistory(input)).toThrowError(
        "invalid board state",
      );
    },
  );
});
