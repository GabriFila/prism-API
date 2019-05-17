import * as express from "express";
import { isNumber } from "util";
import { microState } from "../model";

export const prismMotors = express.Router();

prismMotors.put("/:axis", (req, res, next) => {
  let axis = (req.params.axis as string).toLowerCase();
  if (axis == "x" || axis == "z" || axis == "z")
    if (isNumber(req.body.newValue)) {
      res.resource = microState.motors[axis];
      next();
    } else res.status(400).json({ error: `${req.body.newValue} is not a number` });
  else res.status(400).json({ error: `${axis} is invalid for axis` });
});
