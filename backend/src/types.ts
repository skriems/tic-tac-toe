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

type ErrorMessage = {
  type: "error";
  message: string;
};

type RegisterPlayerMessage = {
  type: "registerPlayer";
  name: string;
};

type RegisteredPlayerMessage = {
  type: "registeredPlayer";
  name: string;
};

type PlayerOnlineMessage = {
  type: "playerOnline";
  name: string;
};

type PlayerOfflineMessage = {
  type: "playerOffline";
  name: string;
};

export type MoveMessage = {
  type: "move";
  value: string;
  matchId: string;
  playerName: string;
  board: string[];
};

type MoveDoneMessage = {
  type: "moveDone";
  value: string;
  matchId: string;
  playerName: string;
  board: string[];
};

type ResultMessage = {
  type: "result";
  match: DBMatch;
  message: string;
};

type MatchCreatedMessage = {
  type: "matchCreated";
  match: DBMatch;
};

export type Message =
  | ErrorMessage
  | MatchCreatedMessage
  | MoveDoneMessage
  | MoveMessage
  | PingMessage
  | PlayerOfflineMessage
  | PlayerOnlineMessage
  | PongMessage
  | RegisterPlayerMessage
  | RegisteredPlayerMessage
  | ResultMessage;
