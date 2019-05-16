"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
const updater_1 = require("./updater");
updater_1.start();
observer.send(this, "update", { resource: "offset-x", value: true });
observer.send(this, "spento", 24);
//# sourceMappingURL=main.js.map