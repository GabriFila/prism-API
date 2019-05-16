"use strict";
exports.__esModule = true;
var observer = require("node-observer");
var temp = {
    name: "Gabriele",
    surname: "Fialferro"
};
observe(temp);
function observe(what) {
    observer.subscribe(this, what.name, function (who, data) {
        console.log("who: " + who);
        console.log("data: " + data);
        console.log("what surname: " + what.surname);
    });
}
observer.send(this, "Gabriele", 24);
