"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
const model_1 = require("./model");
const SerialPort = require("serialport");
observer.subscribe(this, "API-updated", (who, resource) => {
    sendUpdateToPrism(resource.name, resource.value);
});
function sendUpdateToPrism(resId, resValue) { }
function setUpMicroCom() { }
exports.setUpMicroCom = setUpMicroCom;
let portName;
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
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
            observer.send(this, "API-updated");
        }
    }
    catch (s) {
        console.log("ERRORE:  !!!!!!!!!!!!!!!!");
    }
});
function updateMicroState(res) {
    let idEls = res.name.split("-");
    switch (idEls[0]) {
        case "scanParams":
            if (idEls[1] == "dwellTime")
                model_1.microState.scanParams.dwellTime.value = res.value;
            else
                model_1.microState.scanParams[idEls[1]][idEls[2]].value = res.value;
            break;
        case "laser":
            model_1.microState.lasers.find(laser => laser.waveLength.value == Number(idEls[1]))[idEls[3]].value = res.value;
            break;
        default:
            break;
    }
}
//# sourceMappingURL=toFromPrism.js.map