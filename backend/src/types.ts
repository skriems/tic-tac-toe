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

type PingMessage = {
  type: "ping";
};

type PongMessage = {
  type: "pong";
};

export type Message = PingMessage | PongMessage;
