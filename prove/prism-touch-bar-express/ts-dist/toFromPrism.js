"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const events_1 = require("events");
const api_resources_1 = require("./api-resources");
let portName;
let port;
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
exports.updateEmitter = new events_1.EventEmitter();
exports.microState = new api_resources_1.State();
exports.updateEmitter.setMaxListeners(0);
/*
const port = new SerialPort("COM4", {
  autoOpen: false
});


*/
function startSerial() {
    SerialPort.list(function (err, ports) {
        ports.forEach(function (port) {
            if (port.vendorId == "2341") {
                console.log("Found It");
                portName = port.comName.toString();
                console.log(portName);
                port = new SerialPort(portName, {
                    baudRate: 9600,
                    autoOpen: false
                });
                port.open(() => console.log(`Serial port ${port.path} open`));
                port.pipe(parser);
            }
            else
                console.log("no microscope attached");
        });
    });
}
exports.startSerial = startSerial;
parser.on("data", data => {
    try {
        let objRx = JSON.parse(data);
        if (objRx != null) {
            console.log(objRx);
            updateStateFromPrism(objRx);
        }
        else
            console.log("Object received is null");
    }
    catch (s) {
        console.log("ERRORE:  !!!!!!!!!!!!!!!!");
        //console.log(s);
    }
});
function sendUpdateToPrism(event, data) {
    port.write(serialize({ event, data }));
}
exports.sendUpdateToPrism = sendUpdateToPrism;
function serialize(obj) {
    //console.log(JSON.stringify(obj));
    console.log("sent");
    return JSON.stringify(obj);
}
function updateStateFromPrism(objRx) {
    if ("event" in objRx) {
        switch (objRx["event"]) {
            case "micro-updated-offset-x":
                exports.microState.scanParams.offset.x.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-offset-x");
                break;
            case "micro-updated-offset-y":
                exports.microState.scanParams.offset.y.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-offset-y");
                break;
            case "micro-updated-offset-z":
                exports.microState.scanParams.offset.z.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-offset-z");
                break;
            case "micro-updated-pixelNumber-x":
                exports.microState.scanParams.pixelNumber.x.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-pixelNumber-x");
                break;
            case "micro-updated-pixelNumber-y":
                exports.microState.scanParams.pixelNumber.y.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-pixelNumber-y");
                break;
            case "micro-updated-pixelNumber-z":
                exports.microState.scanParams.pixelNumber.z.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-pixelNumber-z");
                break;
            case "micro-updated-range-x":
                exports.microState.scanParams.range.x.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-range-x");
                break;
            case "micro-updated-range-y":
                exports.microState.scanParams.range.y.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-range-y");
                break;
            case "micro-updated-range-z":
                exports.microState.scanParams.range.z.current = objRx.newValue;
                exports.updateEmitter.emit("micro-updated-range-z");
                break;
            case "micro-updated-lasers":
                exports.microState.lasers = objRx.lasers;
                exports.updateEmitter.emit("micro-updated-lasers");
                break;
            case "micro-updated-limits":
                exports.updateEmitter.emit("micro-updated-limits");
                break;
            case "micro-updated-mode":
                exports.microState.mode = objRx.newMode;
                exports.updateEmitter.emit("micro-updated-mode");
                break;
            case "micro-updated-state":
                exports.microState = objRx.newState;
                exports.updateEmitter.emit("micro-updated-state");
                break;
            default:
                break;
        }
    }
}
/*sender for updates event */
function simulateStateFromMicroscope() {
    exports.microState.scanParams.dwellTime = 50;
    exports.microState.scanParams.offset.x.current = 0;
    exports.microState.scanParams.offset.x.max = 1000;
    exports.microState.scanParams.offset.x.min = 0;
    exports.microState.scanParams.offset.y.current = 0;
    exports.microState.scanParams.offset.y.max = 1000;
    exports.microState.scanParams.offset.y.min = 0;
    exports.microState.scanParams.offset.z.current = 0;
    exports.microState.scanParams.offset.z.max = 1000;
    exports.microState.scanParams.offset.z.min = 0;
    exports.microState.scanParams.pixelNumber.x.current = 500;
    exports.microState.scanParams.pixelNumber.x.max = 1000;
    exports.microState.scanParams.pixelNumber.x.min = 0;
    exports.microState.scanParams.pixelNumber.y.current = 500;
    exports.microState.scanParams.pixelNumber.y.max = 1000;
    exports.microState.scanParams.pixelNumber.y.min = 0;
    exports.microState.scanParams.pixelNumber.z.current = 500;
    exports.microState.scanParams.pixelNumber.z.max = 1000;
    exports.microState.scanParams.pixelNumber.z.min = 0;
    exports.microState.scanParams.range.x.current = 500;
    exports.microState.scanParams.range.x.max = 1000;
    exports.microState.scanParams.range.x.min = 0;
    exports.microState.scanParams.range.y.current = 500;
    exports.microState.scanParams.range.y.max = 1000;
    exports.microState.scanParams.range.y.min = 0;
    exports.microState.scanParams.range.z.current = 500;
    exports.microState.scanParams.range.z.max = 1000;
    exports.microState.scanParams.range.z.min = 0;
    exports.microState.lasers[0].waveLength = 300;
    exports.microState.lasers[0].isOn = true;
    exports.microState.lasers[0].power = 0;
    exports.microState.lasers[1].waveLength = 400;
    exports.microState.lasers[1].isOn = true;
    exports.microState.lasers[1].power = 10;
    exports.microState.lasers[2].waveLength = 500;
    exports.microState.lasers[2].isOn = true;
    exports.microState.lasers[2].power = 20;
    exports.microState.lasers[3].waveLength = 600;
    exports.microState.lasers[3].isOn = true;
    exports.microState.lasers[3].power = 30;
}
exports.simulateStateFromMicroscope = simulateStateFromMicroscope;
//# sourceMappingURL=toFromPrism.js.map