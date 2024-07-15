import express from "express";
import cors from "cors";
import { PORT } from "./env";
import { wss } from "./websocket/server";
import { createMatch, getMatches } from "./handler/matches";

const corsOptions = {
  origin: "*",
  allowedHeaders: "*",
  methods: "*",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.headers["user-agent"]}`);
  next();
});

app.get("/matches", getMatches);
app.post("/matches", createMatch);

const server = app.listen(PORT, () =>
  console.log(`Server started on localhost:${PORT}`),
);

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
