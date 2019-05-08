import * as express from "express";
import { state } from "../server";
import { State } from "api-classes";

const prismState = express.Router();
const lasers = require("./lasers");
const scanParams = require("./scanParams-route");

prismState.get("/", (req, res) => {
  res.json(state);
});

//to improve
prismState.put("/", (req, res) => {
  let errors: string[] = [];
    
  if ("state" in req.body) {

  } else errors.push("missing state field in request");

  if (errors.length > 0) res.status(400).json(errors);
  else res.status(200).json({ newState: state });
});

prismState.get("/mode", (req, res) => {
  res.json({ mode: state.mode });
});

prismState.put("/mode", (req, res) => {
  
  let errors: string[] = [];
  let newMode: string;
  if (req.body.newMode) {
    newMode = req.body.newMode;
    if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "none") {
      state.mode = newMode;
    } else errors.push(`${newMode} mode is invalid`);
  } else errors.push(`no newMode field in request`);

  if (errors.length > 0) res.status(400).json({ errors });
  else res.status(200).json({ newMode: state.mode });
});

prismState.use("/lasers", lasers);
prismState.use("/scanParams", scanParams);

module.exports = prismState;
