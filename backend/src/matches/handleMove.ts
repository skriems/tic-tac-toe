import { updateMatch } from "../database/memory";
import type { Board, DBMatch, MoveMessage } from "../types";
import { isWinner, winnerMessage } from "./isWinner";

const isPlaying = <T extends { player_x?: string; player_o?: string }>(
  match: T,
  player: string,
) => match.player_x === player || match.player_o === player;

const isValidTeam = <T extends { player_x?: string; player_o?: string }>(
  match: T,
  player: string,
  team: string,
) =>
  (match.player_x === player && team === "x") ||
  (match.player_o === player && team === "o");

const isDone = (board: Board) => !board.includes(null);

export function handleMove(msg: MoveMessage, match: DBMatch) {
  if (isDone(match.board)) {
    throw Error("match is already done");
  }

  const [player, idx] = msg.value.split(":");
  const team = player.toLowerCase();
  const index = parseInt(idx);

  if (team && Number.isFinite(index)) {
    if (match.board[index]) {
      throw Error("cell has already been taken");
    }

    // setting initial player
    if (!match.player_x && team === "x") {
      match.player_x = msg.playerName;
    }

    const notPlaying = !isPlaying(match, msg.playerName);
    if (notPlaying && !match.player_o && team === "o") {
      match.player_o = msg.playerName;
    } else if (notPlaying) {
      throw Error("you are not a player in this match");
    }

    if (!isValidTeam(match, msg.playerName, team)) {
      throw Error("sorry, not your turn");
    }

    let payload: Record<string, unknown> = {};
    match.board[index] = team;
    if (isWinner(match.board, team, index)) {
      match.winner = team;
      payload = { type: "result", match, message: winnerMessage(match) };
    } else if (isDone(match.board)) {
      match.winner = "draw";
      payload = { type: "result", match, message: winnerMessage(match) };
    } else {
      payload = { type: "moveDone", match };
    }

    updateMatch(match.id, match);
    return JSON.stringify(payload);
  }
  throw Error(`could not parse move: ${msg.value}`);
}
