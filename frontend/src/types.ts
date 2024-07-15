export type Board = (string | null)[];

export type DBMatch = {
  id: string;
  player_x?: string;
  player_o?: string;
  board: Board;
  winner?: string;
};

type PingMessage = {
  type: "ping";
};

type PongMessage = {
  type: "pong";
};

export type Message = PingMessage | PongMessage;
