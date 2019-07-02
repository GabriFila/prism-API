"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const observer = require("node-observer");
const model_1 = require("../../model");
exports.updates = express.Router();
//sends update to UI when a change is made from a UI or from microscope
exports.updates.get("/", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });
    observer.subscribe(this, "update-to-UI", (who, resource) => {
        SSEwriteResource(resource);
    });
    observer.subscribe(this, "micro-connected", () => SSEwriteEvent("micro-connected"));
    //send SSE events when lasers are changeed from microscope
    observer.subscribe(this, "lasers-changed", () => {
        res.write(`data: ${JSON.stringify({ lasers: model_1.microState.lasers })}\n`);
        res.write(`event: lasers-changed\n`);
        res.write(`\n`);
    });
    //send SSE with updated resource
    function SSEwriteResource(resource) {
        res.write(`data: ${JSON.stringify({ resource })} \n`);
        res.write(`event: update\n`);
        res.write(`\n`);
    }
    //send SSE with only specific event field
    function SSEwriteEvent(event) {
        res.write(`data: \n`);
        res.write(`event: ${event}\n`);
        res.write(`\n`);
    }
});
//# sourceMappingURL=updates-route.js.map