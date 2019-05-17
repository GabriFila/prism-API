import * as express from "express";
import { microState } from "../model";

export const scanParams = express.Router();

scanParams.put("/:dim/:axis", (req, res, next) => {
  let dim = req.params.dim as string;
  let axis = (req.params.axis as string).toLowerCase();
  if (dim == "offset" || dim == "range" || dim == "pixelNumber" || dim == "offset") {
    if (axis == "x" || axis == "y" || axis == "z") {
      res.resource = microState.scanParams[dim][axis];
      next();
    } else res.status(400).json({ error: `${axis} is not a valid axis` });
  } else res.status(400).json({ error: `${dim} is not a valid dimension` });
});

scanParams.put("/:dim", (req, res, next) => {
  let errors: string[] = [];
  if (req.params.dim == "dwellTime") {
    res.resource = microState.scanParams.dwellTime;
    next();
  } else res.status(400).json({ error: `${req.params.dim} is an invalid resource` });
});
