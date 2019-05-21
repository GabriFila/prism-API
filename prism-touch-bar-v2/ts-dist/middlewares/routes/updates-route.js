"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const observer = require("node-observer");
exports.updates = express.Router();
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
    function SSEwriteResource(resource) {
        res.write(`data: ${JSON.stringify({ resource })} \n`);
        res.write(`event: update\n`);
        res.write(`\n`);
    }
    function SSEwriteEvent(event) {
        res.write(`data: \n`);
        res.write(`event: ${event}\n`);
        res.write(`\n`);
    }
});
//# sourceMappingURL=updates-route.js.map