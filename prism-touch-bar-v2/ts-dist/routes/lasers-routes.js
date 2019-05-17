"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../model");
const lasers = express.Router();
lasers.get("/", (req, res) => {
    res.json(model_1.microState.lasers);
});
//request has to have both power and status
lasers.put("/:param", (req, res, next) => {
    console.info("PUT laser ");
    //there is newValue parameter in request
    if ("errors" in res)
        next();
    else {
        let errors = [];
        if ("wavelength" in req.query) {
            let targetWL = req.query.waveLength;
            if (model_1.microState.lasers.some(laser => laser.waveLength.value == targetWL)) {
                if ("isOn" in req.params)
                    res.resource = model_1.microState.lasers.find(laser => laser.waveLength.value == targetWL).isOn;
                else if ("power" in req.params)
                    res.resource = model_1.microState.lasers.find(laser => laser.waveLength.value == targetWL).power;
                else
                    errors.push(`Invalid parameter in url`);
            }
            else
                errors.push(`No laser with wavelength ${targetWL}`);
        }
        else
            errors.push("No wavelength query parameter in url");
        if (errors.length > 0)
            res.errors = errors;
        next();
    }
});
module.exports = lasers;
//# sourceMappingURL=lasers-routes.js.map