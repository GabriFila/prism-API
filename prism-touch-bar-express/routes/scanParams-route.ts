import * as express from "express";
import { state } from "../server";

const scanParam = express.Router();

scanParam.get("/", (req, res) => {
  res.json(state.scanParams);
});

scanParam.put("/:dim/:axis", (req, res) => {
  let errors: string[] = [];
  let dim = (req.params.dim as string);
  let axis = (req.params.axis as string).toLowerCase();
  let newValue;
  if (dim == "offset" || dim == "range" || dim == "pixelNumber" || dim == "offset") {
    if (axis == "x" || axis == "y" || axis == "z") {
      if ("newValue" in req.body) {
        newValue = req.body.newValue;
        if (newValue >= state.scanParams[dim][axis].min) {
          if (newValue <= state.scanParams[dim][axis].max) {
            state.scanParams[dim][axis].current = newValue;
          } else errors.push(`${newValue} is higher than max value(${state.scanParams[dim][axis].max})`);
        } else errors.push(`${newValue} is lower than min value (${state.scanParams[dim][axis].min})`);
      } else errors.push(`newValue field not specified`);
    } else errors.push(`${axis} is not a valid axis`);
  } else errors.push(`${dim} is not a valid dimension`);

  if (errors.length > 0) res.status(400).json({ errors });
  else res.status(200).json({ dim, axis, newValue, state });
});

scanParam.put("/:dim", (req, res) => {
  let errors: string[] = [];
  if (req.params.dim == "dwellTime") {
    if (req.body.newValue) {
      if (req.body.newValue > 0) state.scanParams.dwellTime = req.body.newValue;
      else errors.push("time value must be positive");
    } else errors.push("no newValue field specified");
  } else errors.push(`${req.params.dim} is an invalid resource`);

  if (errors.length > 0) res.status(400).json({ errors });
  else res.status(200).send({ newValue: req.body.newValue });
});

module.exports = scanParam;
