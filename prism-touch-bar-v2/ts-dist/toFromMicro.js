"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
const model_1 = require("./model");
const SerialPort = require("serialport");
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
function setUpMicroCom() {
    observer.subscribe(this, "update-to-micro", (who, resource) => {
        console.log("update-to-micro");
        sendUpdateToPrism(resource);
    });
    SerialPort.list(function (err, ports) {
        ports.forEach(function (port) {
            if (port.vendorId == "2341") {
                console.log("Found It");
                let portName = port.comName.toString();
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
exports.setUpMicroCom = setUpMicroCom;
//gets serial input and parses it
parser.on("data", data => {
    try {
        let objRx = JSON.parse(data);
        if (objRx != null) {
            updateMicroState(objRx);
            observer.send(this, "update-to-UI");
        }
    }
    catch (s) {
        console.log("Error on parsing serial input");
    }
});
function updateMicroState(res) {
    let idEls = res.id.split("-");
    switch (idEls[0]) {
        case "scanParams":
            if (idEls[1] == "dwellTime")
                model_1.microState.scanParams.dwellTime.value = res.newValue;
            else
                model_1.microState.scanParams[idEls[1]][idEls[2]].value = res.newValue;
            break;
        case "laser":
            model_1.microState.lasers.find(laser => laser.waveLength.value == Number(idEls[1]))[idEls[3]].value = res.newValue;
            break;
        case "mode":
            model_1.microState.mode.value = res.newValue;
            break;
        default:
            break;
    }
}
function sendUpdateToPrism(res) {
    let objTx = {
        id: res.id,
        newValue: res.value
    };
    parser.write(serializeData(objTx));
}
function serializeData(obj) {
    return JSON.stringify(obj);
}
//# sourceMappingURL=toFromMicro.js.map