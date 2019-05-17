"use strict";
exports.__esModule = true;
var observer = require("node-observer");
observer.subscribe(this, "hello", function (who, data) {
    console.log("who: " + who);
    console.log("data: " + data);
});
