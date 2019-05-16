"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
/*
export function start() {
  observe(gabri);
  observe(isa);
}

export function observe(what: any) {
  observer.subscribe(this, what.name, (who: any, data: any) => {
    console.log("who: " + who);
    console.log("data: " + data);
    console.log("what surname: " + what.surname);
  });
}
*/
class ResourceValue {
}
function start() {
    observer.subscribe(this, "update", (who, data) => {
        console.log("event " + data.resource);
        console.log("value " + data.value);
    });
    observer.subscribe(this, "spento", (who, data) => {
        console.log("spento");
    });
}
exports.start = start;
//# sourceMappingURL=updater.js.map