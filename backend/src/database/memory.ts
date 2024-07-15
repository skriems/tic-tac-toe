import { Board, DB, DBMatch } from "../types";

export const db: DB = {
  matches: [],
};

export function getMatches() {
  return db.matches;
}

export function getMatch(id: string) {
  return getMatches().find((m) => m.id === id);
}

export function createMatch<T extends Partial<DBMatch>>(data?: T) {
  const id = Math.random().toString(36).substr(2, 9);
  const board: Board = Array(9).fill(null);
  const match = { id, board, ...data };
  db.matches.push(match);
  return match;
}

export function updateMatch<T extends DBMatch>(id: string, payload: T) {
  const match = db.matches.find((m) => m.id === id);
  if (match) {
    match.player_x = payload.player_x;
    match.player_o = payload.player_o;
    match.board = payload.board;
  }
}
