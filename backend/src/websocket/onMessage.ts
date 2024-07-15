import ws from "ws";
import { sendMessage } from "./server";
import { Message } from "../types";

export const onMessage = (ws: ws) => (message: ws.RawData) => {
  console.log("Received message:", message.toString());
  try {
    const msg = JSON.parse(message.toString()) as Message;
    switch (msg.type) {
      case "pong": {
        break;
      }
      default:
        console.info("unknown message:", message.toString());
    }
  } catch (error) {
    console.error("Error while handling message:", error);
    sendMessage(
      JSON.stringify({ type: "error", message: (error as Error).message }),
      ws,
    );
  }
};
