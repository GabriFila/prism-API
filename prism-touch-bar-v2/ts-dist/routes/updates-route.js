"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const observer = require("node-observer");
exports.updates = express.Router();
function setUpObserver() {
    console.log(`setting up observer`);
    observer.subscribe(this, "API-updated", (who, data) => {
        //function sendUpdateToPrism(`updated-${resource.name}`, resource.value)
        //SSEwrite(resource.value, `updated-${resource.name}`);
        console.info(`Sent update with ${data.value}`);
        //console.log("name " + data.name);
        //console.log("value " + data.value);
    });
}
exports.setUpObserver = setUpObserver;
function speak() {
    console.log("parlare");
}
exports.speak = speak;
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
//module.exports = updates;
//# sourceMappingURL=updates-route.js.map