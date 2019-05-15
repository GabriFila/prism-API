"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("../server");
const updatePrism_1 = require("../updatePrism");
const updates = express.Router();
updates.get("/", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });
    updatePrism_1.updateEmitter.on("UI-updated-offset-x", () => {
        let newValue = server_1.microState.scanParams.offset.x.current;
        SSEwrite({ newValue }, "updated-offset-x");
        updatePrism_1.sendUpdateToPrism("updated-offset-x", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-offset-y", () => {
        let newValue = server_1.microState.scanParams.offset.y.current;
        SSEwrite({ newValue }, "updated-offset-y");
        updatePrism_1.sendUpdateToPrism("updated-offset-y", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-offset-z", () => {
        let newValue = server_1.microState.scanParams.offset.z.current;
        SSEwrite({ newValue }, "updated-offset-z");
        updatePrism_1.sendUpdateToPrism("updated-offset-z", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-pixelNumber-x", () => {
        let newValue = server_1.microState.scanParams.pixelNumber.x.current;
        SSEwrite({ newValue }, "updated-pixelNumber-x");
        updatePrism_1.sendUpdateToPrism("updated-pixelNumber-x", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-pixelNumber-y", () => {
        let newValue = server_1.microState.scanParams.pixelNumber.y.current;
        SSEwrite({ newValue }, "updated-pixelNumber-y");
        updatePrism_1.sendUpdateToPrism("updated-pixelNumber-y", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-pixelNumber-z", () => {
        let newValue = server_1.microState.scanParams.pixelNumber.z.current;
        SSEwrite({ newValue }, "updated-pixelNumber-z");
        updatePrism_1.sendUpdateToPrism("updated-pixelNumber-z", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-range-x", () => {
        let newValue = server_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-x");
        updatePrism_1.sendUpdateToPrism("updated-range-x", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-range-y", () => {
        let newValue = server_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-y");
        updatePrism_1.sendUpdateToPrism("updated-range-y", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-range-z", () => {
        let newValue = server_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-z");
        updatePrism_1.sendUpdateToPrism("updated-range-z", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-dwellTime", () => {
        let newValue = server_1.microState.scanParams.dwellTime;
        SSEwrite({ newValue }, "updated-dwellTime");
        updatePrism_1.sendUpdateToPrism("updated-dwellTime", { newValue });
    });
    updatePrism_1.updateEmitter.on("UI-updated-lasers", () => {
        let lasers = server_1.microState.lasers;
        SSEwrite(lasers, "updated-lasers");
        updatePrism_1.sendUpdateToPrism("updated-lasers", { lasers });
    });
    updatePrism_1.updateEmitter.on("UI-updated-mode", () => {
        let newMode = server_1.microState.mode;
        SSEwrite({ newMode }, "updated-mode");
        updatePrism_1.sendUpdateToPrism("updated-mode", { mode: newMode });
    });
    updatePrism_1.updateEmitter.on("UI-updated-state", () => {
        let newState = server_1.microState;
        SSEwrite({ newState }, "updated-state");
        updatePrism_1.sendUpdateToPrism("updated-state", newState);
    });
    updatePrism_1.updateEmitter.on("limits-updated", () => {
        SSEwrite(server_1.microState, "limits-updated");
    });
    updatePrism_1.updateEmitter.on("micro-updated-offset-x", () => {
        let newValue = server_1.microState.scanParams.offset.x.current;
        SSEwrite({ newValue }, "updated-offset-x");
    });
    updatePrism_1.updateEmitter.on("micro-updated-offset-y", () => {
        let newValue = server_1.microState.scanParams.offset.y.current;
        SSEwrite({ newValue }, "updated-offset-y");
    });
    updatePrism_1.updateEmitter.on("micro-updated-offset-z", () => {
        let newValue = server_1.microState.scanParams.offset.z.current;
        SSEwrite({ newValue }, "updated-offset-z");
    });
    updatePrism_1.updateEmitter.on("micro-updated-pixelNumber-x", () => {
        let newValue = server_1.microState.scanParams.pixelNumber.x.current;
        SSEwrite({ newValue }, "updated-pixelNumber-x");
    });
    updatePrism_1.updateEmitter.on("micro-updated-pixelNumber-y", () => {
        let newValue = server_1.microState.scanParams.pixelNumber.y.current;
        SSEwrite({ newValue }, "updated-pixelNumber-y");
    });
    updatePrism_1.updateEmitter.on("micro-updated-pixelNumber-z", () => {
        let newValue = server_1.microState.scanParams.pixelNumber.z.current;
        SSEwrite({ newValue }, "updated-pixelNumber-z");
    });
    updatePrism_1.updateEmitter.on("micro-updated-range-x", () => {
        let newValue = server_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-x");
    });
    updatePrism_1.updateEmitter.on("micro-updated-range-y", () => {
        let newValue = server_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-y");
    });
    updatePrism_1.updateEmitter.on("micro-updated-range-z", () => {
        let newValue = server_1.microState.scanParams.range.x.current;
        SSEwrite({ newValue }, "updated-range-z");
    });
    updatePrism_1.updateEmitter.on("micro-updated-dwellTime", () => {
        let newValue = server_1.microState.scanParams.dwellTime;
        SSEwrite({ newValue }, "updated-dwellTime");
    });
    updatePrism_1.updateEmitter.on("micro-updated-lasers", () => {
        let lasers = server_1.microState.lasers;
        SSEwrite(lasers, "updated-lasers");
    });
    updatePrism_1.updateEmitter.on("micro-updated-mode", () => {
        let newMode = server_1.microState.mode;
        SSEwrite({ newMode }, "updated-mode");
    });
    updatePrism_1.updateEmitter.on("micro-updated-state", () => {
        let newState = server_1.microState;
        SSEwrite({ newState }, "updated-state");
    });
    updatePrism_1.updateEmitter.on("limits-updated", () => {
        SSEwrite(server_1.microState, "limits-updated");
    });
    function SSEwrite(input, event) {
        res.write(`data: ${JSON.stringify(input)} \n`);
        res.write(`event: ${event}\n`);
        res.write(`\n`);
    }
});
module.exports = updates;
//# sourceMappingURL=updates-route.js.map