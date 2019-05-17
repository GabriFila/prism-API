"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../../model");
const scanParams_route_1 = require("./scanParams-route");
const mode_route_1 = require("./mode-route");
const lasers_route_1 = require("./lasers-route");
exports.prismState = express.Router();
exports.prismState.get("/", (req, res, next) => {
    res.status(200).json(model_1.microState);
});
exports.prismState.use("/scanParams", scanParams_route_1.scanParams);
exports.prismState.use("/mode", mode_route_1.mode);
exports.prismState.use("/lasers", lasers_route_1.lasers);
//# sourceMappingURL=prismState-route.js.map