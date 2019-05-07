"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("../server");
const util_1 = require("util");
const lasers = express.Router();
lasers.get("/", (req, res) => {
    res.json(server_1.state.lasers);
});
//request has to have both power and status
lasers.put("/:waveLength", (req, res) => {
    let errors = [];
    let targetWaveLength = req.params.waveLength;
    let newPower;
    if (server_1.state.lasers.find(laser => laser.waveLength == targetWaveLength)) {
        if ("isOn" in req.body) {
            if (util_1.isBoolean(req.body.isOn)) {
                server_1.state.lasers.find(laser => laser.waveLength == targetWaveLength).isOn = req.body.isOn;
            }
            else
                errors.push(`isOn value ${req.body.isOn} is invalid`);
        }
        else
            errors.push("no isOn field present");
        if ("newPower" in req.body) {
            newPower = req.body.newPower;
            if (newPower >= 0 && newPower <= 100)
                server_1.state.lasers.find(laser => laser.waveLength == targetWaveLength).power = newPower;
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
            newPower: server_1.state.lasers.find(laser => laser.waveLength == targetWaveLength).power,
            targetWaveLength,
            isOn: server_1.state.lasers.find(laser => laser.waveLength == targetWaveLength).isOn
        });
});
module.exports = lasers;
//# sourceMappingURL=lasers.js.map