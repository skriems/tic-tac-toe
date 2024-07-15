import ws from "ws";
import { broadcast, clients, sendMessage } from "./server";
import type { Message } from "../types";
import { createMessage } from "./createMessage";
import { getMatch } from "../database/memory";
import { handleMove } from "../matches/handleMove";

export const onMessage = (ws: ws) => (msg: ws.RawData) => {
  console.log("Received message:", msg.toString());
  try {
    const parsedMsg = JSON.parse(msg.toString()) as Message;

    switch (parsedMsg.type) {
      case "pong": {
        break;
      }
      case "registerPlayer": {
        clients[parsedMsg.name] = ws;
        sendMessage(
          createMessage("registeredPlayer", { name: parsedMsg.name }),
          ws,
        );
        broadcast(createMessage("playerOnline", { name: parsedMsg.name }));
        break;
      }
      case "move": {
        const match = getMatch(parsedMsg.matchId);
        if (!match) {
          throw Error(`no match found with id: ${parsedMsg.matchId}`);
        }
        const msg = handleMove(parsedMsg, match);
        broadcast(msg);
        break;
      }
      default:
        console.info("unknown message:", msg.toString());
    }
  } catch (error) {
    console.error("Error while handling message:", error);
    sendMessage(
      createMessage("error", { message: (error as Error).message }),
      ws,
    );
  }
};
