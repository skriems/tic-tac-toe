import ws from "ws";

export const wss = new ws.Server({ noServer: true });

const clients: Record<string, ws> = {};

wss.on("connection", (ws) => {
  console.log("Client connected. Sending ping...");
  ws.send(JSON.stringify({ type: "ping" }));
  ws.on("message", (msg) => ws.send(msg));
  ws.on("close", (n) => console.log("Client disconnected. Code:", n));
});

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
