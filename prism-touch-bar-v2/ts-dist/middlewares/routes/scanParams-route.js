"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../../model");
exports.scanParams = express.Router();
exports.scanParams.get("/", (req, res) => {
    res.status(200).json(model_1.microState.scanParams);
});
exports.scanParams.get("/:dim/:axis", (req, res) => {
    let dim = req.params.dim;
    let axis = req.params.axis.toLowerCase();
    if (dim == "offset" || dim == "range" || dim == "pixelNumber" || dim == "offset") {
        if (axis == "x" || axis == "y" || axis == "z") {
            res.status(200).json(model_1.microState.scanParams[dim][axis]);
        }
        else
            res.status(400).json({ error: `${axis} is not a valid axis` });
    }
    else
        res.status(400).json({ error: `${dim} is not a valid dimension` });
});
exports.scanParams.put("/:dim/:axis", (req, res, next) => {
    let dim = req.params.dim;
    let axis = req.params.axis.toLowerCase();
    if (dim == "offset" || dim == "range" || dim == "pixelNumber" || dim == "offset") {
        if (axis == "x" || axis == "y" || axis == "z") {
            res.resource = model_1.microState.scanParams[dim][axis];
            console.log("dim: " + dim);
            console.log("axis: " + axis);
            next();
        }
        else
            res.status(400).json({ error: `${axis} is not a valid axis` });
    }
    else
        res.status(400).json({ error: `${dim} is not a valid dimension` });
});
exports.scanParams.put("/:dim", (req, res, next) => {
    if (req.params.dim == "dwellTime") {
        res.resource = model_1.microState.scanParams.dwellTime;
        next();
    }
    else
        res.status(400).json({ error: `${req.params.dim} is an invalid resource` });
});
//# sourceMappingURL=scanParams-route.js.map