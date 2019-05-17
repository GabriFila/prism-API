import * as express from "express";
import { microState } from "../../model";

export const mode = express.Router();

mode.get("/", (req, res) => {
  res.status(200).json(microState.mode);
});

mode.put("/", (req, res, next) => {
  let newMode = req.body.newValue;
  if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "stand-by") {
    res.resource = microState.mode;
    next();
  } else res.status(400).json({ error: `${newMode} is invalid for mode` });
});
