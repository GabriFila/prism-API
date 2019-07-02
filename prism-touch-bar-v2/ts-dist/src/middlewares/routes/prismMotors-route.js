"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const util_1 = require("util");
const model_1 = require("../../model");
exports.prismMotors = express.Router();
exports.prismMotors.put("/:axis", (req, res, next) => {
    let axis = req.params.axis.toLowerCase();
    if (axis == "x" || axis == "y" || axis == "z")
        if (util_1.isNumber(req.body.newValue)) {
            res.resource = model_1.microState.motors[axis];
            next();
        }
        else
            res.status(400).json({ error: `${req.body.newValue} is not a number` });
    else
        res.status(400).json({ error: `${axis} is invalid for axis` });
});
//# sourceMappingURL=prismMotors-route.js.map