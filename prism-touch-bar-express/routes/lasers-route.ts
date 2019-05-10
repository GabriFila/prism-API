import * as express from "express";
import { microState, updateEmitter } from "../server";
import { isBoolean } from "util";

const lasers = express.Router();

lasers.get("/", (req, res) => {
  res.json(microState.lasers);
});

//request has to have both power and status
lasers.put("/:waveLength", (req, res) => {
  let errors: string[] = [];
  let targetWaveLength: number = req.params.waveLength;

  let newPower: number;

  if (microState.lasers.find(laser => laser.waveLength == targetWaveLength)) {
    if ("isOn" in req.body) {
      if (isBoolean(req.body.isOn)) {
        microState.lasers.find(laser => laser.waveLength == targetWaveLength).isOn = req.body.isOn;
      } else errors.push(`isOn value ${req.body.isOn} is invalid`);
    } else errors.push("no isOn field present");
    if ("newPower" in req.body) {
      newPower = req.body.newPower;
      if (newPower >= 0 && newPower <= 100) microState.lasers.find(laser => laser.waveLength == targetWaveLength).power = newPower;
      else errors.push(`newPower value ${newPower} is invalid`);
    } else errors.push("no newPower field present");
  } else errors.push(`no laser with wave length ${targetWaveLength} nm`);

  targetWaveLength = Number(targetWaveLength);

  if (errors.length > 0) res.status(400).json({ errors });
  else
    res.status(200).json({
      targetWaveLength,
      newPower: microState.lasers.find(laser => laser.waveLength == targetWaveLength).power,
      isOn: microState.lasers.find(laser => laser.waveLength == targetWaveLength).isOn
    });

  updateEmitter.emit("lasers-updated");
});

module.exports = lasers;
