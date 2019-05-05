"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("../server");
const prismState = express.Router();
const lasers = require("./lasers");
const scanParams = require("./scanParams");
prismState.get("/", (req, res) => {
    res.json(server_1.state);
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
    else
        res.status(200).json({ newState: server_1.state });
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
        res.status(200).json({ newMode: server_1.state.mode });
});
prismState.use("/lasers", lasers);
prismState.use("/scanParams", scanParams);
module.exports = prismState;
//# sourceMappingURL=prismState.js.map