"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lasers_1 = require("./mainUIparts/lasers");
const scanParameteres_1 = require("./mainUIparts/scanParameteres");
const scanArea_1 = require("./mainUIparts/scanArea");
const mode_1 = require("./mainUIparts/mode");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("lasers-changed", (event) => {
        console.log("lasers-changed");
        let lasers = JSON.parse(event.data).lasers;
        lasers_1.updateUILasersFromLasers(lasers);
    });
    source.addEventListener("update", (event) => {
        let resource = JSON.parse(event.data).resource;
        let idEls = resource.id.split("-");
        switch (idEls[0]) {
            case "mode":
                mode_1.updateModeBtns(resource.value);
                break;
            case "scanParams":
                scanParameteres_1.changeScanParam(resource.id, resource.value, false);
                scanArea_1.adatapLookSurface();
                //(document.getElementById(resource.id) as HTMLInputElement).value = resource.value.toString();
                break;
            case "laser":
                let targetLaserRow = lasers_1.laserUIRows.find(laserRow => laserRow.waveLength == Number(idEls[1]));
                switch (idEls[3]) {
                    case "isOn":
                        targetLaserRow.isOn = resource.value;
                        break;
                    case "power":
                        targetLaserRow.power = resource.value;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });
}
exports.setUpUpdater = setUpUpdater;
function sendPut(resource, newValue) {
    fetch(`/${resource}`, {
        method: "PUT",
        body: JSON.stringify({ newValue }),
        headers: {
            "Content-type": "application/json"
        }
    });
}
exports.sendPut = sendPut;
function getCurrentMicroState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then((newState) => {
        scanParameteres_1.updateLimits(newState.scanParams);
        lasers_1.updateUILasersFromLasers(newState.lasers);
        scanParameteres_1.updateUIParameters(newState.scanParams);
        scanArea_1.adatapLookSurface();
    });
}
exports.getCurrentMicroState = getCurrentMicroState;
//# sourceMappingURL=toFromAPI.js.map