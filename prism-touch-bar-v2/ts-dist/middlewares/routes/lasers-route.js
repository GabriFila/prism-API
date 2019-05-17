"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../../model");
const util_1 = require("util");
exports.lasers = express.Router();
exports.lasers.get("/", (req, res) => {
    res.json(model_1.microState.lasers);
});
//request has to have both power and status
exports.lasers.put("/:param", (req, res, next) => {
    console.log("laser params: " + req.params.param);
    //there is newValue parameter in request
    if ("waveLength" in req.query) {
        let targetWL = req.query.waveLength;
        console.info("waveLength: " + targetWL);
        if (model_1.microState.lasers.some(laser => laser.waveLength.value == targetWL)) {
            if (req.params.param == "isOn")
                if (util_1.isBoolean(req.body.newValue)) {
                    res.resource = model_1.microState.lasers.find(laser => laser.waveLength.value == targetWL).isOn;
                    next();
                }
                else
                    res.status(400).json({ error: `${req.body.newValue} is not boolean` });
            else if (req.params.param == "power")
                if (util_1.isNumber(req.body.newValue)) {
                    res.resource = model_1.microState.lasers.find(laser => laser.waveLength.value == targetWL).power;
                    next();
                }
                else
                    res.status(400).json({ error: `${req.body.newValue} is not a number` });
            else
                res.status(400).json({ error: `${req.params.param} is not a valid url parameter` });
        }
        else
            res.status(400).json({ error: `No laser with wavelength ${targetWL} nm` });
    }
    else
        res.status(400).json({ error: "No wavelength query parameter in url" });
});
//# sourceMappingURL=lasers-route.js.map