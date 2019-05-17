import * as express from "express";
import { microState } from "../model";
import { runInNewContext } from "vm";

export const mode = express.Router();

mode.get("/", (req, res,next) => {
  res.resource = microState.mode;
  next();
});

mode.put("/", (req, res, next) => {
  let newMode = req.body.newValue;
  if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "stand-by") {
    res.resource = microState.mode;
    next();
  } else res.status(400).json({ error: `${newMode} is invalid for mode` });
});
