import { DBMatch } from "../types";

export const winnerMessage = (match: DBMatch) => {
  switch (match?.winner) {
    case "draw":
      return "draw";
    case "x":
      return `${match.player_x} wins`;
    case "o":
      return `${match.player_o} wins`;
    default:
      return null;
  }
};
