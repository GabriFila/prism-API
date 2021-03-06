import * as express from "express";
import { microState } from "../../model";
import { scanParams } from "./scanParams-route";
import { mode } from "./mode-route";
import { lasers } from "./lasers-route";
import { prismMotors } from "./prismMotors-route";

export const prismState = express.Router();

prismState.get("/", (req, res, next) => {
  res.status(200).json(microState);
});

//add routes for specific resources
prismState.use("/scanParams", scanParams);
prismState.use("/mode", mode);
prismState.use("/lasers", lasers);
prismState.use("/motors", prismMotors);
