import { Request, Response } from "express";
import {
  getMatches as dbGetMatches,
  createMatch as dbCreateMatch,
} from "../database/memory";

import { broadcast } from "../websocket/server";

export function getMatches(_req: Request, res: Response) {
  const matches = dbGetMatches();
  res.json(matches);
}

export function createMatch(_req: Request, res: Response) {
  const match = dbCreateMatch(undefined);
  const url = `http://localhost:8000/matches/${match.id}`;
  broadcast(JSON.stringify({ type: "matchCreated", match }));
  res.status(201).location(url).json(match);
}
