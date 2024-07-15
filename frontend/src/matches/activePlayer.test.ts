import { describe, test, expect } from "vitest";
import { activePlayer } from "./activePlayer";

describe("activePlayer", () => {
  test.each([
    ["o", ["x", null, null, null, null, null, null, null, null]],
    ["x", ["x", "o", null, null, null, null, null, null, null]],
    ["o", ["x", "o", null, "x", null, null, null, null, null]],
    // ...
  ])("returns player %s for board %s", (player, board) => {
    expect(activePlayer(board)).toEqual(player);
  });
});
