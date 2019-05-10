import * as express from "express";
import { motorValues } from "../server";

const prismMotors = express.Router();

prismMotors.put("/:axis", (req, res) => {
  let newSteps;
  let axis = (req.params.axis as string).toLocaleUpperCase();
  let errors: string[] = [];
  //check if axis is x,y,z
  if (axis !== `X` && axis !== `Y` && axis !== `Z`) {
    errors.push(`${axis} is not a valid axis`);
  } else {
    //checks if there is step field
    if (req.body.steps) {
      newSteps = req.body.steps;
      switch (axis) {
        case `X`:
          motorValues.xSteps = newSteps;
          break;
        case `Y`:
          motorValues.ySteps = newSteps;
          break;
        case `Z`:
          motorValues.zSteps = newSteps;
          break;
        default:
          break;
      }
    } else errors.push(`no steps field in request body`);
  }
  if (errors.length > 0) res.status(400).json({ errors });
  else res.status(200).json({ newSteps, axis });
});

module.exports = prismMotors;
