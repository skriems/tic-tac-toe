import { describe, test, expect } from "vitest";
import { handleMove, isPlaying, isValidTeam } from "./handleMove";
import { DBMatch, MoveDoneMessage, MoveMessage } from "../types";

describe("isPlaying", () => {
  test.each([
    [true, "foo", { player_x: "foo", player_o: "bar" }],
    [true, "foo", { player_x: "bar", player_o: "foo" }],
    [false, "baz", { player_x: "foo", player_o: "bar" }],
    // ...
  ])("returns %s for player %s in match %s", (playing, player, match) => {
    expect(isPlaying(match, player)).toEqual(playing);
  });
});

describe("isValidTeam", () => {
  test.each([
    [true, "foo", "x", { player_x: "foo", player_o: "bar" }],
    [false, "foo", "o", { player_x: "foo", player_o: "bar" }],
    [true, "bar", "o", { player_x: "foo", player_o: "bar" }],
    [false, "bar", "x", { player_x: "foo", player_o: "bar" }],
    // ...
  ])(
    "returns %s for player %s in team %s in match %s",
    (result, player, team, match) => {
      expect(isValidTeam(match, player, team)).toEqual(result);
    },
  );
});

describe("handleMove", () => {
  test.each([
    [
      {
        type: "move",
        matchId: "1",
        value: "x:1",
        playerName: "foo",
      } satisfies MoveMessage,
      {
        id: "1",
        player_x: "foo",
        player_o: undefined,
        board: [null, null, null, null, null, null, null, null, null],
      } satisfies DBMatch,
      {
        type: "moveDone",
        match: {
          id: "1",
          player_x: "foo",
          player_o: undefined,
          board: [null, "x", null, null, null, null, null, null, null],
        } satisfies DBMatch,
      } satisfies MoveDoneMessage,
    ],
    // ...
  ])("return the correct message", (message, match, result) => {
    expect(handleMove(message, match)).toEqual(JSON.stringify(result));
  });

  test.each([
    [
      {
        type: "move",
        matchId: "1",
        value: "o:1",
        playerName: "foo",
      } satisfies MoveMessage,
      {
        id: "1",
        player_x: "bar",
        player_o: "foo",
        board: [null, "x", null, null, null, null, null, null, null],
      } satisfies DBMatch,
      "cell has already been taken",
    ],
    [
      {
        type: "move",
        matchId: "1",
        value: "o:8",
        playerName: "alice",
      } satisfies MoveMessage,
      {
        id: "1",
        player_x: "bar",
        player_o: "foo",
        board: [null, "x", null, null, null, null, null, null, null],
      } satisfies DBMatch,
      "you are not a player in this match",
    ],
    // ...
  ])("throws the correct errors", (message, match, error) => {
    expect(() => handleMove(message, match)).toThrowError(error);
  });
});
