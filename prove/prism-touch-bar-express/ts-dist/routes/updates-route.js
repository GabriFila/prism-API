"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const toFromPrism_1 = require("../toFromPrism");
const toFromPrism_2 = require("../toFromPrism");
const updates = express.Router();
updates.get("/", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });
    toFromPrism_2.updateEmitter.on("UI-updated-offset-x", () => {
        let newValue = toFromPrism_1.microState.scanParams.offset.x.current;
        SSEwrite({ newValue }, "updated-offset-x");
        toFromPrism_2.sendUpdateToPrism("updated-offset-x", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-offset-y", () => {
        let newValue = toFromPrism_1.microState.scanParams.offset.y.current;
        SSEwrite({ newValue }, "updated-offset-y");
        toFromPrism_2.sendUpdateToPrism("updated-offset-y", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-offset-z", () => {
        let newValue = toFromPrism_1.microState.scanParams.offset.z.current;
        SSEwrite({ newValue }, "updated-offset-z");
        toFromPrism_2.sendUpdateToPrism("updated-offset-z", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-pixelNumber-x", () => {
        let newValue = toFromPrism_1.microState.scanParams.pixelNumber.x.current;
        SSEwrite({ newValue }, "updated-pixelNumber-x");
        toFromPrism_2.sendUpdateToPrism("updated-pixelNumber-x", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-pixelNumber-y", () => {
        let newValue = toFromPrism_1.microState.scanParams.pixelNumber.y.current;
        SSEwrite({ newValue }, "updated-pixelNumber-y");
        toFromPrism_2.sendUpdateToPrism("updated-pixelNumber-y", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-pixelNumber-z", () => {
        let newValue = toFromPrism_1.microState.scanParams.pixelNumber.z.current;
        SSEwrite({ newValue }, "updated-pixelNumber-z");
        toFromPrism_2.sendUpdateToPrism("updated-pixelNumber-z", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-range-x", () => {
        let newValue = toFromPrism_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-x");
        toFromPrism_2.sendUpdateToPrism("updated-range-x", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-range-y", () => {
        let newValue = toFromPrism_1.microState.scanParams.range.y.current;
        SSEwrite({ newValue }, "updated-range-y");
        toFromPrism_2.sendUpdateToPrism("updated-range-y", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-range-z", () => {
        let newValue = toFromPrism_1.microState.scanParams.range.z.current;
        SSEwrite({ newValue }, "updated-range-z");
        toFromPrism_2.sendUpdateToPrism("updated-range-z", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-dwellTime", () => {
        let newValue = toFromPrism_1.microState.scanParams.dwellTime;
        SSEwrite({ newValue }, "updated-dwellTime");
        toFromPrism_2.sendUpdateToPrism("updated-dwellTime", { newValue });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-lasers", () => {
        let lasers = toFromPrism_1.microState.lasers;
        SSEwrite(lasers, "updated-lasers");
        toFromPrism_2.sendUpdateToPrism("updated-lasers", { lasers });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-mode", () => {
        let newMode = toFromPrism_1.microState.mode;
        SSEwrite({ newMode }, "updated-mode");
        toFromPrism_2.sendUpdateToPrism("updated-mode", { mode: newMode });
    });
    toFromPrism_2.updateEmitter.on("UI-updated-state", () => {
        let newState = toFromPrism_1.microState;
        SSEwrite({ newState }, "updated-state");
        toFromPrism_2.sendUpdateToPrism("updated-state", newState);
    });
    toFromPrism_2.updateEmitter.on("limits-updated", () => {
        SSEwrite(toFromPrism_1.microState, "limits-updated");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-offset-x", () => {
        let newValue = toFromPrism_1.microState.scanParams.offset.x.current;
        SSEwrite({ newValue }, "updated-offset-x");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-offset-y", () => {
        let newValue = toFromPrism_1.microState.scanParams.offset.y.current;
        SSEwrite({ newValue }, "updated-offset-y");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-offset-z", () => {
        let newValue = toFromPrism_1.microState.scanParams.offset.z.current;
        SSEwrite({ newValue }, "updated-offset-z");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-pixelNumber-x", () => {
        let newValue = toFromPrism_1.microState.scanParams.pixelNumber.x.current;
        SSEwrite({ newValue }, "updated-pixelNumber-x");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-pixelNumber-y", () => {
        let newValue = toFromPrism_1.microState.scanParams.pixelNumber.y.current;
        SSEwrite({ newValue }, "updated-pixelNumber-y");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-pixelNumber-z", () => {
        let newValue = toFromPrism_1.microState.scanParams.pixelNumber.z.current;
        SSEwrite({ newValue }, "updated-pixelNumber-z");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-range-x", () => {
        let newValue = toFromPrism_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-x");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-range-y", () => {
        let newValue = toFromPrism_1.microState.scanParams.range.y.current;
        SSEwrite({ newValue }, "updated-range-y");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-range-z", () => {
        let newValue = toFromPrism_1.microState.scanParams.range.z.current;
        SSEwrite({ newValue }, "updated-range-z");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-dwellTime", () => {
        let newValue = toFromPrism_1.microState.scanParams.dwellTime;
        SSEwrite({ newValue }, "updated-dwellTime");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-lasers", () => {
        let lasers = toFromPrism_1.microState.lasers;
        SSEwrite(lasers, "updated-lasers");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-mode", () => {
        let newMode = toFromPrism_1.microState.mode;
        SSEwrite({ newMode }, "updated-mode");
    });
    toFromPrism_2.updateEmitter.on("micro-updated-state", () => {
        let newState = toFromPrism_1.microState;
        SSEwrite({ newState }, "updated-state");
    });
    toFromPrism_2.updateEmitter.on("limits-updated", () => {
        SSEwrite(toFromPrism_1.microState, "limits-updated");
    });
    function SSEwrite(input, event) {
        res.write(`data: ${JSON.stringify(input)} \n`);
        res.write(`event: ${event}\n`);
        res.write(`\n`);
    }
});
module.exports = updates;
//# sourceMappingURL=updates-route.js.map