"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("../server");
const prismState = express.Router();
const lasers = require("./lasers");
const scanParams = require("./scan-params");
prismState.get("/", (req, res) => {
    res.json(server_1.state);
});
prismState.get("/mode", (req, res) => {
    res.json({ mode: server_1.state.mode });
});
prismState.put("/mode", (req, res) => {
    let errors = [];
    let newMode;
    if (req.body.newMode) {
        newMode = req.body.newMode;
        if (newMode === "live" || newMode === "capture" || newMode === "stack" || newMode === "none") {
            server_1.state.mode = newMode;
        }
        else
            errors.push(`${newMode} mode is invalid`);
    }
    else
        errors.push(`no newMode field in request`);
    if (errors.length > 0)
        res.status(400).json({ errors });
    else
        res.status(200).json({ newMode });
});
prismState.use("/lasers", lasers);
prismState.use("/scan-params", scanParams);
module.exports = prismState;
//# sourceMappingURL=prism-state.js.map