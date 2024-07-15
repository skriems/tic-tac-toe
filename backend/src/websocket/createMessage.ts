import { Message } from "../types";

type MessageType = Message["type"];

export function createMessage(
  type: MessageType,
  data: Record<string, unknown>,
) {
  return JSON.stringify({ type, ...data });
}
