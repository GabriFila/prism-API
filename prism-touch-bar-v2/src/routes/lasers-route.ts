import * as express from "express";
import { microState } from "../model";

const lasers = express.Router();

lasers.get("/", (req, res) => {
  res.json(microState.lasers);
});

//request has to have both power and status
lasers.put("/:param", (req, res, next) => {
  console.info("PUT laser ");
  console.log("laser params: "+ req.params.param);
  

  //there is newValue parameter in request
  if ("errors" in res) next();
  else {
    let errors: string[] = [];
    if ("waveLength" in req.query) {
      let targetWL = req.query.waveLength;
      if (microState.lasers.some(laser => laser.waveLength.value == targetWL)) {
        console.info("")
        if ("isOn" in req.params) res.resource = microState.lasers.find(laser => laser.waveLength.value == targetWL).isOn;
        else if ("power" in req.params) res.resource = microState.lasers.find(laser => laser.waveLength.value == targetWL).power;
        else errors.push(`Invalid parameter in url`);
      } else errors.push(`No laser with wavelength ${targetWL}`);
    } else errors.push("No wavelength query parameter in url");

    if (errors.length > 0) res.errors = errors;
    console.log("res router: " + res);

    next();
  }
});

module.exports = lasers;
