import * as express from "express";
import { microState } from "../model";
import {scanParams} from "./scanParams-route";
import { mode } from "./mode-route";

export const prismState = express.Router();

prismState.get("/", (req, res) => {
    
  res.status(200).json({ value: microState });
});

prismState.use("/scanParams", scanParams);
prismState.use("/mode", mode);