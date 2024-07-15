import ws from "ws";
import { onMessage } from "./onMessage";

export const wss = new ws.Server({ noServer: true });

const clients: Record<string, ws> = {};

wss.on("connection", (ws) => {
  console.log("Client connected");
  sendMessage(JSON.stringify({ type: "ping" }), ws);
  ws.on("message", onMessage(ws));
  ws.on("close", (n) => console.log("Client disconnected. Code:", n));
});

export function sendMessage(message: string, ws: ws) {
  console.log("Sending message:", message);
  ws.send(message, handleError(ws));
}

export const broadcast = (message: string) => {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(message, handleError(client));
    }
  });
};

const handleError = (ws: ws) => (error?: Error) => {
  if (error) {
    console.error("Error while sending message:", error);
    ws.close();
    const player = Object.keys(clients).find((key) => clients[key] === ws);
    if (player) {
      delete clients[player];
      broadcast(JSON.stringify({ type: "playerOffline", name: player }));
    }
  }
};
