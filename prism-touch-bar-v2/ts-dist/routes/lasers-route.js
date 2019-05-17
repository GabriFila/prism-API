"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../model");
exports.lasers = express.Router();
exports.lasers.get("/", (req, res) => {
    res.json(model_1.microState.lasers);
});
//request has to have both power and status
exports.lasers.put("/:param", (req, res, next) => {
    console.log("laser params: " + req.params.param);
    //there is newValue parameter in request
    if ("errors" in res)
        next();
    else {
        let errors = [];
        if ("waveLength" in req.query) {
            let targetWL = req.query.waveLength;
            console.info("waveLength: " + targetWL);
            if (model_1.microState.lasers.some(laser => laser.waveLength.value == targetWL)) {
                if (req.params.param == "isOn")
                    res.resource = model_1.microState.lasers.find(laser => laser.waveLength.value == targetWL).isOn;
                else if (req.params.param == "power")
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
//# sourceMappingURL=lasers-route.js.map