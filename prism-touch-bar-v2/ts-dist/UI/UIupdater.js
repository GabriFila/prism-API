"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("update", (event) => {
        let resource = JSON.parse(event.data).resource;
        console.log("data: " + event.data);
        let idEls = resource.name.split("-");
        switch (idEls[0]) {
            case "scanParams":
                document.getElementById(resource.name).value = resource.value.toString();
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
            case "motor":
                break;
        }
        mainUI_1.lookSurface.leftRelPos = (Number(scanParameteres_1.UIparameters[0].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
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
const scanParameteres_1 = require("./UIparts/scanParameteres");
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then((newState) => {
        updateLimits(newState.scanParams);
        lasers_1.updateUILasersFromLasers(newState.lasers);
        updateUIParameters(newState.scanParams);
        updateUIPads(newState.scanParams);
    });
}
exports.getCurrentState = getCurrentState;
const mainUI_1 = require("./mainUI");
const lasers_1 = require("./UIparts/lasers");
function updateUIPads(scanParams) {
    mainUI_1.lookSurface.leftRelPos =
        (scanParams.offset.x.value * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParams.offset.x.name).max;
    mainUI_1.lookSurface.topRelPos =
        (scanParams.offset.y.value * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParams.offset.y.name).max;
    mainUI_1.lookSurface.elWidth =
        (scanParams.range.x.value * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParams.range.x.name).max;
    mainUI_1.lookSurface.elHeight =
        (scanParams.range.y.value * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParams.range.y.name).max;
}
function updateUIParameters(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        document.getElementById(scanParams[prop].x.name).value = scanParams[prop].x.value.toString();
        document.getElementById(scanParams[prop].y.name).value = scanParams[prop].y.value.toString();
        document.getElementById(scanParams[prop].z.name).value = scanParams[prop].z.value.toString();
    });
    document.getElementById("scanParams-dwellTime").value = scanParams.dwellTime.value.toString();
}
function updateLimits(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].x.name).max = scanParams[prop].x.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].x.name).min = scanParams[prop].x.min;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].y.name).max = scanParams[prop].y.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].y.name).min = scanParams[prop].y.min;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].z.name).max = scanParams[prop].z.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].z.name).min = scanParams[prop].z.min;
    });
    scanParameteres_1.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
//# sourceMappingURL=UIupdater.js.map