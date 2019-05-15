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
        SSEwrite({ newValue: server_1.microState.scanParams.pixelNumber.x.current }, "updated-pixelNumber-x");
    });
    updatePrism_1.updateEmitter.on("UI-updated-pixelNumber-y", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.pixelNumber.y.current }, "updated-pixelNumber-y");
    });
    updatePrism_1.updateEmitter.on("UI-updated-pixelNumber-z", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.pixelNumber.z.current }, "updated-pixelNumber-z");
    });
    updatePrism_1.updateEmitter.on("UI-updated-range-x", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.range.x.current }, "updated-range-x");
    });
    updatePrism_1.updateEmitter.on("UI-updated-range-y", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.range.y.current }, "updated-range-y");
    });
    updatePrism_1.updateEmitter.on("UI-updated-range-z", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.range.z.current }, "updated-range-z");
    });
    updatePrism_1.updateEmitter.on("UI-updated-dwellTime", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.dwellTime }, "dwellTime-updated");
    });
    updatePrism_1.updateEmitter.on("UI-updated-lasers", () => {
        SSEwrite(server_1.microState.lasers, "lasers-updated");
    });
    updatePrism_1.updateEmitter.on("UI-updated-mode", () => {
        SSEwrite({ mode: server_1.microState.mode }, "mode-updated");
    });
    updatePrism_1.updateEmitter.on("UI-updated-state", () => {
        SSEwrite({ newState: server_1.microState }, "state-updated");
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