export type Board = (string | null)[];

export type DBMatch = {
  id: string;
  board: Board;
  player_x?: string;
  player_o?: string;
  winner?: string;
};

export type DB = {
  matches: DBMatch[];
};
