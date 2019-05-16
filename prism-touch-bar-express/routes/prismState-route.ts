import * as express from "express";
import { microState } from "../toFromPrism";
import { updateEmitter } from "../toFromPrism";

const prismState = express.Router();
const lasers = require("./lasers-route");
const scanParams = require("./scanParams-route");

prismState.get("/", (req, res) => {
  res.json(microState);
});

//to improve
prismState.put("/", (req, res) => {
  let errors: string[] = [];

  if ("state" in req.body) {
  } else errors.push("missing state field in request");

  if (errors.length > 0) res.status(400).json(errors);
  else {
    res.status(200).json({ newState: microState });
    updateEmitter.emit("UI-updated-state");
  }
});

prismState.get("/mode", (req, res) => {
  res.json({ mode: microState.mode });
});

prismState.put("/mode", (req, res) => {
  let errors: string[] = [];
  let newMode: string;
  if (req.body.newMode) {
    newMode = req.body.newMode;
    if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "stand-by") {
      microState.mode = newMode;
    } else errors.push(`${newMode} mode is invalid`);
  } else errors.push(`no newMode field in request`);

  if (errors.length > 0) res.status(400).json({ errors });
  else {
    res.status(200).json({ newMode: microState.mode });
    updateEmitter.emit("UI-updated-mode");
  }
});

prismState.use("/lasers", lasers);
prismState.use("/scanParams", scanParams);

module.exports = prismState;
