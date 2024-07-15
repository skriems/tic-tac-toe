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
      case "matchCreated": {
        store.matches.push(msg.match);
        break;
      }
      default:
        console.log("unknown message:", event.data);
    }
  } catch (error) {
    console.error("Error while parsing message:", error);
  }
}
