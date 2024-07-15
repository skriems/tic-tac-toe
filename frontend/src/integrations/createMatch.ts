import { DBMatch } from "../types";

export async function createMatch() {
  const response = await fetch("http://localhost:8000/matches", {
    method: "POST",
  });
  return (await response.json()) as Promise<DBMatch>;
}
