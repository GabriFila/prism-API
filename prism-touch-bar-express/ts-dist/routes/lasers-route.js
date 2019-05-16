"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const toFromPrism_1 = require("../toFromPrism");
const util_1 = require("util");
const toFromPrism_2 = require("../toFromPrism");
const lasers = express.Router();
lasers.get("/", (req, res) => {
    res.json(toFromPrism_1.microState.lasers);
});
//request has to have both power and status
lasers.put("/:waveLength", (req, res) => {
    let errors = [];
    let targetWaveLength = req.params.waveLength;
    let newPower;
    if (toFromPrism_1.microState.lasers.find(laser => laser.waveLength == targetWaveLength)) {
        if ("isOn" in req.body) {
            if (util_1.isBoolean(req.body.isOn)) {
                toFromPrism_1.microState.lasers.find(laser => laser.waveLength == targetWaveLength).isOn = req.body.isOn;
            }
            else
                errors.push(`isOn value ${req.body.isOn} is invalid`);
        }
        else
            errors.push("no isOn field present");
        if ("newPower" in req.body) {
            newPower = req.body.newPower;
            if (newPower >= 0 && newPower <= 100)
                toFromPrism_1.microState.lasers.find(laser => laser.waveLength == targetWaveLength).power = newPower;
            else
                errors.push(`newPower value ${newPower} is invalid`);
        }
        else
            errors.push("no newPower field present");
    }
    else
        errors.push(`no laser with wave length ${targetWaveLength} nm`);
    targetWaveLength = Number(targetWaveLength);
    if (errors.length > 0)
        res.status(400).json({ errors });
    else
        res.status(200).json({
            targetWaveLength,
            newPower: toFromPrism_1.microState.lasers.find(laser => laser.waveLength == targetWaveLength).power,
            isOn: toFromPrism_1.microState.lasers.find(laser => laser.waveLength == targetWaveLength).isOn
        });
    toFromPrism_2.updateEmitter.emit("UI-updated-lasers");
});
module.exports = lasers;
//# sourceMappingURL=lasers-route.js.map