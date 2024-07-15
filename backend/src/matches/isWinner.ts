import { Board, DBMatch } from "../types";

const winnerCoords = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const isWinner = (board: Board, team: string, index: number) => {
  for (const coords of winnerCoords) {
    if (!coords.includes(index)) {
      continue;
    }
    if (coords.every((i) => board[i] === team)) {
      return true;
    }
  }
  return false;
};

export const winnerMessage = (match: DBMatch) => {
  switch (match.winner) {
    case "draw":
      return "draw";
    case "x":
      return `${match.player_x} wins for team X`;
    case "o":
      return `${match.player_o} wins for team O`;
    default:
      return null;
  }
};
