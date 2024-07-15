import { Board } from "../types";

export function activePlayer(board: Board): string {
  const count = {
    x: 0,
    o: 0,
  };

  for (const cell of board) {
    if (cell === "x") {
      count.x += 1;
    } else if (cell === "o") {
      count.o += 1;
    }
  }

  if (count.x === count.o) {
    return "x";
  }
  return "o";
}
