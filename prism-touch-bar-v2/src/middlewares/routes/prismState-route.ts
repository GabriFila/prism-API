import * as express from "express";
import { microState } from "../../model";
import { scanParams } from "./scanParams-route";
import { mode } from "./mode-route";
import { lasers } from "./lasers-route";

export const prismState = express.Router();

prismState.get("/", (req, res, next) => {
  res.status(200).json(microState);
});

prismState.use("/scanParams", scanParams);
prismState.use("/mode", mode);
prismState.use("/lasers", lasers);

