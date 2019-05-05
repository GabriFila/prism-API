"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("../server");
const prismMotors = express.Router();
prismMotors.put("/:axis", (req, res) => {
    let newSteps;
    let axis = req.params.axis.toLocaleUpperCase();
    let errors = [];
    //check if axis is x,y,z
    if (axis !== `X` && axis !== `Y` && axis !== `Z`) {
        errors.push(`${axis} is not a valid axis`);
    }
    else {
        //checks if there is step field
        if (req.body.steps) {
            newSteps = req.body.steps;
            switch (axis) {
                case `X`:
                    server_1.motors.xSteps = newSteps;
                    break;
                case `Y`:
                    server_1.motors.ySteps = newSteps;
                    break;
                case `Z`:
                    server_1.motors.zSteps = newSteps;
                    break;
                default:
                    break;
            }
        }
        else
            errors.push(`no steps field in request body`);
    }
    if (errors.length > 0)
        res.status(400).json({ errors });
    else
        res.status(200).json({ newSteps, axis });
});
module.exports = prismMotors;
//# sourceMappingURL=prismMotors.js.map