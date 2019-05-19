"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lasers_1 = require("./UIparts/lasers");
const limits_1 = require("./UIparts/limits");
const scanParameteres_1 = require("./UIparts/scanParameteres");
const lookSurface_1 = require("./UIparts/lookSurface");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("update", (event) => {
        let resource = JSON.parse(event.data).resource;
        console.log("data: " + event.data);
        let idEls = resource.name.split("-");
        switch (idEls[0]) {
            case "scanParams":
                document.getElementById(resource.name).value = resource.value.toString();
                updatePadsFromResName(resource.name);
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
        updateUIPads(newState.scanParams);
    });
}
exports.getCurrentMicroState = getCurrentMicroState;
function updateUIPads(scanParams) {
    lookSurface_1.lookSurface.leftRelPos =
        (scanParams.offset.x.value * lookSurface_1.lookSurface.areaWidth) / limits_1.limits.find(limit => limit.id == scanParams.offset.x.name).max;
    lookSurface_1.lookSurface.topRelPos =
        (scanParams.offset.y.value * lookSurface_1.lookSurface.areaHeight) / limits_1.limits.find(limit => limit.id == scanParams.offset.y.name).max;
    lookSurface_1.lookSurface.elWidth =
        (scanParams.range.x.value * lookSurface_1.lookSurface.areaWidth) / limits_1.limits.find(limit => limit.id == scanParams.range.x.name).max;
    lookSurface_1.lookSurface.elHeight =
        (scanParams.range.y.value * lookSurface_1.lookSurface.areaHeight) / limits_1.limits.find(limit => limit.id == scanParams.range.y.name).max;
}
function updatePadsFromResName(id) {
    let idEls = id.split("-");
    if (idEls[1] == "offset") {
        if (idEls[2] == "x")
            lookSurface_1.lookSurface.leftRelPos =
                (Number(document.getElementById(id).value) * lookSurface_1.lookSurface.areaWidth) /
                    limits_1.limits.find(limit => limit.id == id).max;
        else if (idEls[2] == "y")
            lookSurface_1.lookSurface.topRelPos =
                (Number(document.getElementById(id).value) * lookSurface_1.lookSurface.areaHeight) /
                    limits_1.limits.find(limit => limit.id == id).max;
    }
    else if (idEls[2] == "x")
        lookSurface_1.lookSurface.elWidth =
            (Number(document.getElementById(id).value) * lookSurface_1.lookSurface.areaWidth) / limits_1.limits.find(limit => limit.id == id).max;
    else if (idEls[2] == "y")
        lookSurface_1.lookSurface.elHeight =
            (Number(document.getElementById(id).value) * lookSurface_1.lookSurface.areaHeight) / limits_1.limits.find(limit => limit.id == id).max;
}
//# sourceMappingURL=toFromAPI.js.map