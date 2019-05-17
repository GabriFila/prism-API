"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const observer = require("node-observer");
exports.updates = express.Router();
function setUpObserver() {
    console.log(`setting up observer`);
    observer.subscribe(this, "API-updated", (who, resource) => {
        //function sendUpdateToPrism(`updated-${resource.name}`, resource.value)
        //SSEwrite(resource.value, `updated-${resource.name}`);
        console.info(`Sent update with ${resource.value}`);
    });
}
exports.setUpObserver = setUpObserver;
exports.updates.get("/", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });
    observer.subscribe(this, "API-update", (who, resource) => {
        //function sendUpdateToPrism(`updated-${resource.name}`, resource.value)
        SSEwrite(resource.value, `updated-${resource.name}`);
        console.log("Sent SSE");
    });
    function SSEwrite(newValue, event) {
        res.write(`data: ${JSON.stringify({ newValue })} \n`);
        res.write(`event: ${event}\n`);
        res.write(`\n`);
    }
});
//# sourceMappingURL=updates-route.js.map