import ws from "ws";

export const wss = new ws.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected. Sending ping...");
  ws.send(JSON.stringify({ type: "ping" }));
  ws.on("message", (msg) => ws.send(msg));
  ws.on("close", (n) => console.log("Client disconnected. Code:", n));
});
