import * as express from "express";
import { microState } from "../../model";
import { isBoolean, isNumber } from "util";

export const lasers = express.Router();

lasers.get("/", (req, res) => {
  res.json(microState.lasers);
});

lasers.put("/:param", (req, res, next) => {
  if ("waveLength" in req.query) {
    let targetWL = req.query.waveLength;
    if (microState.lasers.some(laser => laser.waveLength.value == targetWL)) {
      if (req.params.param == "isOn")
        if (isBoolean(req.body.newValue)) {
          res.resource = microState.lasers.find(laser => laser.waveLength.value == targetWL).isOn;
          next();
        } else res.status(400).json({ error: `${req.body.newValue} is not boolean` });
      else if (req.params.param == "power")
        if (isNumber(req.body.newValue)) {
          res.resource = microState.lasers.find(laser => laser.waveLength.value == targetWL).power;
          next();
        } else res.status(400).json({ error: `${req.body.newValue} is not a number` });
      else res.status(400).json({ error: `${req.params.param} is not a valid url parameter` });
    } else res.status(400).json({ error: `No laser with wavelength ${targetWL} nm` });
  } else res.status(400).json({ error: "No wavelength query parameter in url" });
});
