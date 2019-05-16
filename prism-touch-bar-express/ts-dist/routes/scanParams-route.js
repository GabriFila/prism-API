"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const toFromPrism_1 = require("../toFromPrism");
const toFromPrism_2 = require("../toFromPrism");
const scanParam = express.Router();
scanParam.get("/", (req, res) => {
    res.json(toFromPrism_1.microState.scanParams);
});
scanParam.put("/:dim/:axis", (req, res) => {
    let errors = [];
    let dim = req.params.dim;
    let axis = req.params.axis.toLowerCase();
    let newValue;
    if (dim == "offset" || dim == "range" || dim == "pixelNumber" || dim == "offset") {
        if (axis == "x" || axis == "y" || axis == "z") {
            if ("newValue" in req.body) {
                newValue = req.body.newValue;
                if (newValue >= toFromPrism_1.microState.scanParams[dim][axis].min) {
                    if (newValue <= toFromPrism_1.microState.scanParams[dim][axis].max) {
                        toFromPrism_1.microState.scanParams[dim][axis].current = newValue;
                    }
                    else
                        errors.push(`${newValue} for ${dim} ${axis} is higher than max value(${toFromPrism_1.microState.scanParams[dim][axis].max})`);
                }
                else
                    errors.push(`${newValue} for ${dim} ${axis} is lower than min value (${toFromPrism_1.microState.scanParams[dim][axis].min})`);
            }
            else
                errors.push(`newValue field not specified`);
        }
        else
            errors.push(`${axis} is not a valid axis`);
    }
    else
        errors.push(`${dim} is not a valid dimension`);
    if (errors.length > 0)
        res.status(400).json({ errors });
    else {
        res.status(200).json({ dim, axis, newValue, state: toFromPrism_1.microState });
        toFromPrism_2.updateEmitter.emit(`UI-updated-${dim}-${axis}`);
    }
});
scanParam.put("/:dim", (req, res) => {
    let errors = [];
    if (req.params.dim == "dwellTime") {
        if (req.body.newValue) {
            if (req.body.newValue > 0)
                toFromPrism_1.microState.scanParams.dwellTime = req.body.newValue;
            else
                errors.push("time value must be positive");
        }
        else
            errors.push("no newValue field specified");
    }
    else
        errors.push(`${req.params.dim} is an invalid resource`);
    if (errors.length > 0)
        res.status(400).json({ errors });
    else {
        res.status(200).send({ newValue: req.body.newValue });
        toFromPrism_2.updateEmitter.emit(`UI-updated-dwellTime`);
    }
});
module.exports = scanParam;
//# sourceMappingURL=scanParams-route.js.map