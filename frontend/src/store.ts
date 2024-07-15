import { reactive } from "vue";
import { configureSocketForStore, sendMessage } from "./integrations/ws";
import { DBMatch } from "./types";

export type Store = typeof store;

export const store = reactive({
  connected: false,

  playerName: "",
  setPlayerName(name: string) {
    sendMessage(JSON.stringify({ type: "registerPlayer", name }), this);
  },

  matches: [] as DBMatch[],
  getMatch(id: string) {
    return this.matches.find((m) => m.id === id);
  },

  sendMessage(
    message: string,
    callback: (msg: string, store: Store) => void = sendMessage,
  ) {
    callback(message, this);
  },
});

configureSocketForStore(store);
