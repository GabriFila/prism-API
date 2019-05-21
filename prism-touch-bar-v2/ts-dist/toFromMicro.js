"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
const model_1 = require("./model");
const SerialPort = require("serialport");
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
function tryToConnectToMicro() {
    SerialPort.list().then(ports => {
        if (ports.some(port => port.vendorId == "2341")) {
            let portName = ports.find(port => port.vendorId == "2341").comName.toString();
            console.log(portName);
            let port = new SerialPort(portName, {
                baudRate: 9600,
                autoOpen: false
            });
            observer.subscribe(this, "update-to-micro", (who, resource) => {
                sendUpdateToPrism(resource);
            });
            observer.send(this, "micro-connected");
            port.open(() => console.log(`Serial port ${port.path} open`));
            port.pipe(parser);
        }
        else {
            observer.send(this, "micro-not-connected");
        }
    });
}
exports.tryToConnectToMicro = tryToConnectToMicro;
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
        //console.log("Error on parsing serial input");
    }
});
function updateMicroState(res) {
    if (res.id == "lasers-change") {
        let nLasers = res.newValue.length;
        for (let i = 0; i < nLasers; i++) {
            let newWaveLength;
            model_1.microState.lasers[i].waveLength.value = res.newValue[i];
            model_1.microState.lasers[i].waveLength.id = `laser-${newWaveLength}-nm-waveLength`;
            model_1.microState.lasers[i].isOn.id = `laser-${newWaveLength}-nm-isOn`;
            model_1.microState.lasers[i].power.id = `laser-${newWaveLength}-nm-power`;
            model_1.microState.lasers[i].isPresent.id = `laser-${newWaveLength}-nm-isPresent`;
        }
    }
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