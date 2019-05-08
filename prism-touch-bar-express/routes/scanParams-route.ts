import * as express from "express";
import { microState, updateSender } from "../server";

const scanParam = express.Router();

scanParam.get("/", (req, res) => {
  res.json(microState.scanParams);
});

scanParam.put("/:dim/:axis", (req, res) => {
  let errors: string[] = [];
  let dim = req.params.dim as string;
  let axis = (req.params.axis as string).toLowerCase();
  let newValue;
  if (dim == "offset" || dim == "range" || dim == "pixelNumber" || dim == "offset") {
    if (axis == "x" || axis == "y" || axis == "z") {
      if ("newValue" in req.body) {
        newValue = req.body.newValue;
        if (newValue >= microState.scanParams[dim][axis].min) {
          if (newValue <= microState.scanParams[dim][axis].max) {
            microState.scanParams[dim][axis].current = newValue;
          } else errors.push(`${newValue} is higher than max value(${microState.scanParams[dim][axis].max})`);
        } else errors.push(`${newValue} is lower than min value (${microState.scanParams[dim][axis].min})`);
      } else errors.push(`newValue field not specified`);
    } else errors.push(`${axis} is not a valid axis`);
  } else errors.push(`${dim} is not a valid dimension`);

  if (errors.length > 0) res.status(400).json({ errors });
  else {
    res.status(200).json({ dim, axis, newValue, state: microState });
    updateSender.emit("state-updated");
  }  
});

scanParam.put("/:dim", (req, res) => {
  let errors: string[] = [];
  if (req.params.dim == "dwellTime") {
    if (req.body.newValue) {
      if (req.body.newValue > 0) microState.scanParams.dwellTime = req.body.newValue;
      else errors.push("time value must be positive");
    } else errors.push("no newValue field specified");
  } else errors.push(`${req.params.dim} is an invalid resource`);

  if (errors.length > 0) res.status(400).json({ errors });
  else {
    res.status(200).send({ newValue: req.body.newValue });
    updateSender.emit("state-updated");
  }

});

module.exports = scanParam;
