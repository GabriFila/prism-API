"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const events_1 = require("events");
const server_1 = require("./server");
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
exports.updateEmitter = new events_1.EventEmitter();
exports.updateEmitter.setMaxListeners(0);
const port = new SerialPort("COM4", {
    autoOpen: false
});
function startSerial() {
    port.open(() => console.log(`Serial port ${port.path} open`));
    port.pipe(parser);
}
exports.startSerial = startSerial;
parser.on("data", data => {
    let objRx = JSON.parse(data);
    if (objRx != null) {
        console.log(objRx);
        updateStateFromPrism(objRx);
    }
    else
        console.log("Object received is null");
});
function sendUpdateToPrism(event, data) {
    port.write(serialize({ event, data }));
}
exports.sendUpdateToPrism = sendUpdateToPrism;
function serialize(obj) {
    console.log(JSON.stringify(obj));
    return JSON.stringify(obj);
}
function updateStateFromPrism(objRx) {
    if ("event" in objRx) {
        switch (objRx["event"]) {
            case "micro-updated-offset-x":
                server_1.microState.scanParams.offset.x.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-offset-x");
                break;
            case "micro-updated-offset-y":
                server_1.microState.scanParams.offset.y.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-offset-y");
                break;
            case "micro-updated-offset-z":
                server_1.microState.scanParams.offset.z.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-offset-z");
                break;
            case "micro-updated-pixelNumber-x":
                server_1.microState.scanParams.pixelNumber.x.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-pixelNumber-x");
                break;
            case "micro-updated-pixelNumber-y":
                server_1.microState.scanParams.pixelNumber.y.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-pixelNumber-y");
                break;
            case "micro-updated-pixelNumber-z":
                server_1.microState.scanParams.pixelNumber.z.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-pixelNumber-z");
                break;
            case "micro-updated-range-x":
                server_1.microState.scanParams.range.x.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-range-x");
                break;
            case "micro-updated-range-y":
                server_1.microState.scanParams.range.y.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-range-y");
                break;
            case "micro-updated-range-z":
                server_1.microState.scanParams.range.z.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-range-z");
                break;
            case "micro-updated-lasers":
                server_1.microState.lasers = objRx.lasers;
                exports.updateEmitter.emit("micro-updated-lasers");
                break;
            case "micro-updated-limits":
                exports.updateEmitter.emit("micro-updated-limits");
                break;
            case "micro-updated-mode":
                server_1.microState.mode = objRx.newMode;
                exports.updateEmitter.emit("micro-updated-mode");
                break;
            case "micro-updated-state":
                //microState = objRx.newState;
                exports.updateEmitter.emit("micro-updated-state");
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=updatePrism.js.map