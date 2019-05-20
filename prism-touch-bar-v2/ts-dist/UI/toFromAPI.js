"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lasers_1 = require("./UIparts/lasers");
const limits_1 = require("./UIparts/limits");
const scanParameteres_1 = require("./UIparts/scanParameteres");
const scanArea_1 = require("./UIparts/scanArea");
const mode_1 = require("./UIparts/mode");
const source = new EventSource("/updates");
function setUpUpdater() {
    console.log("SSE opened");
    source.addEventListener("update", (event) => {
        let resource = JSON.parse(event.data).resource;
        let idEls = resource.id.split("-");
        switch (idEls[0]) {
            case "mode":
                mode_1.updateModeBtns(resource.value);
                break;
            case "scanParams":
                document.getElementById(resource.id).value = resource.value.toString();
                updatePadsFromResName(resource.id);
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
        limits_1.updateLimits(newState.scanParams);
        lasers_1.updateUILasersFromLasers(newState.lasers);
        scanParameteres_1.updateUIParameters(newState.scanParams);
        scanArea_1.adatapLookSurface();
    });
}
exports.getCurrentMicroState = getCurrentMicroState;
function updatePadsFromResName(id) {
    let idEls = id.split("-");
    if (idEls[1] == "offset") {
        if (idEls[2] == "x")
            scanArea_1.scanArea.leftRelPos =
                (Number(document.getElementById(id).value) * scanArea_1.scanArea.areaWidth) / limits_1.limits.find(limit => limit.id == id).max;
        else if (idEls[2] == "y")
            scanArea_1.scanArea.topRelPos =
                (Number(document.getElementById(id).value) * scanArea_1.scanArea.areaHeight) / limits_1.limits.find(limit => limit.id == id).max;
    }
    else if (idEls[2] == "x")
        scanArea_1.scanArea.elWidth =
            (Number(document.getElementById(id).value) * scanArea_1.scanArea.areaWidth) / limits_1.limits.find(limit => limit.id == id).max;
    else if (idEls[2] == "y")
        scanArea_1.scanArea.elHeight =
            (Number(document.getElementById(id).value) * scanArea_1.scanArea.areaHeight) / limits_1.limits.find(limit => limit.id == id).max;
}
//# sourceMappingURL=toFromAPI.js.map