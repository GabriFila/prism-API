"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const toFromPrism_1 = require("../toFromPrism");
const toFromPrism_2 = require("../toFromPrism");
const prismState = express.Router();
const lasers = require("./lasers-route");
const scanParams = require("./scanParams-route");
prismState.get("/", (req, res) => {
    res.json(toFromPrism_1.microState);
});
//to improve
prismState.put("/", (req, res) => {
    let errors = [];
    if ("state" in req.body) {
    }
    else
        errors.push("missing state field in request");
    if (errors.length > 0)
        res.status(400).json(errors);
    else {
        res.status(200).json({ newState: toFromPrism_1.microState });
        toFromPrism_2.updateEmitter.emit("UI-updated-state");
    }
});
prismState.get("/mode", (req, res) => {
    res.json({ mode: toFromPrism_1.microState.mode });
});
prismState.put("/mode", (req, res) => {
    let errors = [];
    let newMode;
    if (req.body.newMode) {
        newMode = req.body.newMode;
        if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "stand-by") {
            toFromPrism_1.microState.mode = newMode;
        }
        else
            errors.push(`${newMode} mode is invalid`);
    }
    else
        errors.push(`no newMode field in request`);
    if (errors.length > 0)
        res.status(400).json({ errors });
    else {
        res.status(200).json({ newMode: toFromPrism_1.microState.mode });
        toFromPrism_2.updateEmitter.emit("UI-updated-mode");
    }
});
prismState.use("/lasers", lasers);
prismState.use("/scanParams", scanParams);
module.exports = prismState;
//# sourceMappingURL=prismState-route.js.map