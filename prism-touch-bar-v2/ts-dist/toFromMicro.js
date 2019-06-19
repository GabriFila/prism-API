"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
const model_1 = require("./model");
const SerialPort = require("serialport");
//parse incoming serial data on every \n
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
let sp = undefined;
//try to connect to serial port
function tryToConnectToMicro() {
    //simulate connection with microscope
    if (process.env.SERIAL_CONNECTION == "none") {
        observer.send(this, "micro-connected");
        //open available serial port
    }
    else if (process.env.SERIAL_CONNECTION == "auto") {
        SerialPort.list().then(ports => {
            if (ports.length > 0) {
                let portName = ports[0].comName.toString();
                sp = new SerialPort(portName, {
                    baudRate: 9600,
                    autoOpen: false
                });
                observer.subscribe(this, "update-to-micro", (who, resource) => {
                    sendUpdateToPrism(resource);
                });
                observer.send(this, "micro-connected");
                sp.open(() => console.log(`Serial port ${sp.path} open`));
                sp.pipe(parser);
            }
            else {
                observer.send(this, "micro-not-connected");
            }
        });
        //open specific serialport
    }
    else if (process.env.SERIAL_CONNECTION == "port") {
        sp = new SerialPort(process.env.SERIAL_PORT, {
            baudRate: 9600,
            autoOpen: false
        });
        observer.subscribe(this, "update-to-micro", (who, resource) => {
            sendUpdateToPrism(resource);
        });
        observer.send(this, "micro-connected");
        sp.open(() => console.log(`Serial port ${sp.path} open`));
        sp.pipe(parser);
    }
    else if (process.env.SERIAL_CONNECTION == "vendorId") {
        SerialPort.list().then(ports => {
            if (ports.length > 0 && ports.some(port => port.vendorId == process.env.SERIAL_VENDOR_ID)) {
                let portName = ports.find(port => port.vendorId == process.env.SERIAL_VENDOR_ID).comName.toString();
                sp = new SerialPort(portName, {
                    baudRate: 9600,
                    autoOpen: false
                });
                observer.subscribe(this, "update-to-micro", (who, resource) => {
                    sendUpdateToPrism(resource);
                });
                observer.send(this, "micro-connected");
                sp.open(() => console.log(`Serial port opened, vendor id = ${process.env.SERIAL_VENDOR_ID}`));
                sp.pipe(parser);
            }
            else {
                observer.send(this, "micro-not-connected");
            }
        });
    }
}
exports.tryToConnectToMicro = tryToConnectToMicro;
//get serial input and parse it
parser.on("data", data => {
    try {
        let objRx = JSON.parse(data);
        if (objRx != null) {
            updateMicroState(objRx);
        }
    }
    catch (s) {
        console.log("Error on parsing serial input");
    }
});
function updateMicroState(newData) {
    //lasers changed event handler
    if (newData.id == "lasers-changed") {
        let nLasers = newData.newValue.length;
        for (let i = 0; i < nLasers; i++) {
            let newLaser = newData.newValue[i];
            let newWaveLength = newLaser.wL;
            model_1.microState.lasers[i].waveLength.id = `laser-${newWaveLength}-nm-waveLength`;
            model_1.microState.lasers[i].waveLength.value = newLaser.wL;
            model_1.microState.lasers[i].isOn.id = `laser-${newWaveLength}-nm-isOn`;
            model_1.microState.lasers[i].isOn.value = newLaser.isOn;
            model_1.microState.lasers[i].power.id = `laser-${newWaveLength}-nm-power`;
            model_1.microState.lasers[i].power.value = newLaser.pw;
            model_1.microState.lasers[i].isPresent.id = `laser-${newWaveLength}-nm-isPresent`;
            model_1.microState.lasers[i].isPresent.value = true;
        }
        for (let i = nLasers; i < 4; i++) {
            model_1.microState.lasers[i].waveLength.value = 0;
            model_1.microState.lasers[i].waveLength.id = `no-laser`;
            model_1.microState.lasers[i].isOn.id = `no-laser`;
            model_1.microState.lasers[i].power.id = `no-laser`;
            model_1.microState.lasers[i].isPresent.value = false;
        }
        observer.send(this, "lasers-changed");
    }
    else {
        // resource value updated
        let idEls = newData.id.split("-");
        switch (idEls[0]) {
            case "scanParams":
                if (idEls[1] == "dwellTime")
                    model_1.microState.scanParams.dwellTime.value = newData.newValue;
                else
                    model_1.microState.scanParams[idEls[1]][idEls[2]].value = newData.newValue;
                break;
            case "laser":
                model_1.microState.lasers.find(laser => laser.waveLength.value == Number(idEls[1]))[idEls[3]].value = newData.newValue;
                break;
            case "mode":
                model_1.microState.mode.value = newData.newValue;
                break;
            default:
                break;
        }
        observer.send(this, "update-to-UI", { id: newData.id, value: newData.newValue });
    }
}
function sendUpdateToPrism(res) {
    let objTx = {
        id: res.id,
        newValue: res.value
    };
    sp.write(serializeData(objTx));
    sp.write("\n");
}
function serializeData(obj) {
    return JSON.stringify(obj);
}
//# sourceMappingURL=toFromMicro.js.map