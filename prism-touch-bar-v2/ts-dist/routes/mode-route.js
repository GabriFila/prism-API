"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../model");
exports.mode = express.Router();
exports.mode.get("/", (req, res, next) => {
    res.resource = model_1.microState.mode;
    next();
});
exports.mode.put("/", (req, res, next) => {
    let newMode = req.body.newValue;
    if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "stand-by") {
        res.resource = model_1.microState.mode;
        next();
    }
    else
        res.status(400).json({ error: `${newMode} is invalid for mode` });
});
//# sourceMappingURL=mode-route.js.map