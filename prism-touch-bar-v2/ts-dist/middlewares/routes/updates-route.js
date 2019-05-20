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
    observer.subscribe(this, "API-updated", (who, resource) => {
        SSEwrite(resource);
    });
    observer.subscribe(this, "micro-updated", (who, resource) => {
        SSEwrite(resource);
    });
    function SSEwrite(resource) {
        res.write(`data: ${JSON.stringify({ resource })} \n`);
        res.write(`event: update\n`);
        res.write(`\n`);
    }
});
//# sourceMappingURL=updates-route.js.map