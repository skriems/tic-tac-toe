import ws from "ws";
import { Message } from "../types";
import { Store } from "../store";

export function handleMessage(ws: ws, event: MessageEvent, store: Store) {
  if (typeof event.data !== "string") {
    console.debug("Received non-string message:", event.data);
    return;
  }
  try {
    const msg = JSON.parse(event.data) as Message;
    switch (msg.type) {
      case "ping": {
        console.debug("Sending message: pong");
        ws.send(JSON.stringify({ type: "pong" }));
        break;
      }
      case "registeredPlayer":
        store.playerName = msg.name;
        break;
      case "matchCreated": {
        store.matches.push(msg.match);
        break;
      }
      case "moveDone": {
        const match = store.getMatch(msg.match.id);
        if (match) {
          match.player_x = msg.match.player_x;
          match.player_o = msg.match.player_o;
          // we cannot simply replace match.board here
          for (let [i, move] of msg.match.board.entries()) {
            match.board[i] = move;
          }
        }
        break;
      }
      case "result": {
        const match = store.getMatch(msg.match.id);
        if (match) {
          match.winner = msg.match.winner;
          for (let [i, move] of msg.match.board.entries()) {
            match.board[i] = move;
          }
        }
        break;
      }
      default:
        console.log("unknown message:", event.data);
    }
  } catch (error) {
    console.error("Error while parsing message:", error);
  }
}
