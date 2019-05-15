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
    updatePrism_1.updateEmitter.on("offset-x-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.offset.x.current }, "offset-x-updated");
    });
    updatePrism_1.updateEmitter.on("offset-y-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.offset.y.current }, "offset-y-updated");
    });
    updatePrism_1.updateEmitter.on("offset-z-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.offset.z.current }, "offset-z-updated");
    });
    updatePrism_1.updateEmitter.on("pixelNumber-x-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.pixelNumber.x.current }, "pixelNumber-x-updated");
    });
    updatePrism_1.updateEmitter.on("pixelNumber-y-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.pixelNumber.y.current }, "pixelNumber-y-updated");
    });
    updatePrism_1.updateEmitter.on("pixelNumber-z-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.pixelNumber.z.current }, "pixelNumber-z-updated");
    });
    updatePrism_1.updateEmitter.on("range-x-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.range.x.current }, "range-x-updated");
    });
    updatePrism_1.updateEmitter.on("range-y-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.range.y.current }, "range-y-updated");
    });
    updatePrism_1.updateEmitter.on("range-z-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.range.z.current }, "range-z-updated");
    });
    updatePrism_1.updateEmitter.on("dwellTime-updated", () => {
        SSEwrite({ newValue: server_1.microState.scanParams.dwellTime }, "dwellTime-updated");
    });
    updatePrism_1.updateEmitter.on("lasers-updated", () => {
        SSEwrite(server_1.microState.lasers, "lasers-updated");
    });
    updatePrism_1.updateEmitter.on("mode-updated", () => {
        SSEwrite({ mode: server_1.microState.mode }, "mode-updated");
    });
    updatePrism_1.updateEmitter.on("state-updated", () => {
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