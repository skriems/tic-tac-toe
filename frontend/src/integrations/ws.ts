import type { Store } from "../store";
import { handleMessage } from "./handleMessage";

let socket: WebSocket | null = null;

export function configureSocketForStore(store: Store) {
  return configureSocket(getSocket(), store);
}

export function sendMessage(message: string, store: Store) {
  const socket = getSocket();
  if (socket.readyState !== WebSocket.OPEN) {
    console.error("socket is not open");
    store.connected = false;
    return;
  }
  socket.send(message);
}

function getSocket() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socket = new WebSocket("ws://localhost:8000");
  }
  return socket;
}

function configureSocket(socket: WebSocket, store: Store) {
  console.debug("configuring socket");
  socket.onopen = (_event) => {
    console.debug("connected to server");
    store.connected = true;
  };

  socket.onerror = (event) => {
    console.error("socket error:", event);
  };

  socket.onmessage = (event) => handleMessage(socket, event, store);

  socket.onclose = (_event) => {
    console.log("server disconnected");
    store.connected = false;
  };
}
