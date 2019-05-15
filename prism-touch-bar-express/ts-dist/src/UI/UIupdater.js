"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanParameteres_1 = require("./UIparts/scanParameteres");
const lasers_1 = require("./UIparts/lasers");
const mainUI_1 = require("./mainUI");
const mode_1 = require("./UIparts/mode");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("updated-offset-x", (event) => {
        scanParameteres_1.UIparameters[0].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.leftRelPos = (Number(scanParameteres_1.UIparameters[0].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
    });
    source.addEventListener("updated-offset-y", (event) => {
        scanParameteres_1.UIparameters[1].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.topRelPos = (Number(scanParameteres_1.UIparameters[1].value) * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[1].max;
    });
    source.addEventListener("updated-offset-z", (event) => {
        scanParameteres_1.UIparameters[2].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("updated-pixelNumber-x", (event) => {
        scanParameteres_1.UIparameters[3].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("updated-pixelNumber-y", (event) => {
        scanParameteres_1.UIparameters[4].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("updated-pixelNumber-z", (event) => {
        scanParameteres_1.UIparameters[5].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("updated-range-x", (event) => {
        scanParameteres_1.UIparameters[6].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.elWidth = (Number(scanParameteres_1.UIparameters[6].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[6].max;
    });
    source.addEventListener("updated-range-y", (event) => {
        scanParameteres_1.UIparameters[7].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.elHeight = (Number(scanParameteres_1.UIparameters[7].value) * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[7].max;
    });
    source.addEventListener("updated-range-z", (event) => {
        scanParameteres_1.UIparameters[8].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("updated-dwellTime", (event) => {
        scanParameteres_1.UIparameters[9].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("limits-updated", (event) => {
        let newState = JSON.parse(event.data);
        scanParameteres_1.updateLimits(newState);
        updateUIPads(newState);
    });
    source.addEventListener("updated-lasers", (event) => {
        lasers_1.updateUILasersFromLasers(JSON.parse(event.data));
    });
    source.addEventListener("updated-mode", (event) => {
        mode_1.updateMode(JSON.parse(event.data).newMode);
    });
    source.addEventListener("updated-state", (event) => {
        let newState = JSON.parse(event.data).newState;
        scanParameteres_1.updateLimits(newState);
        updateUIPads(newState);
        lasers_1.updateUILasersFromState(newState);
        scanParameteres_1.updateUIParameters(newState);
    });
}
exports.setUpUpdater = setUpUpdater;
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then(newState => {
        newState;
        scanParameteres_1.updateLimits(newState);
        lasers_1.updateUILasersFromState(newState);
        scanParameteres_1.updateUIParameters(newState);
        updateUIPads(newState);
    });
}
exports.getCurrentState = getCurrentState;
function updateUIPads(newState) {
    mainUI_1.lookSurface.leftRelPos = (newState.scanParams.offset.x.current * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
    mainUI_1.lookSurface.topRelPos = (newState.scanParams.offset.y.current * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[1].max;
    mainUI_1.lookSurface.elWidth = (newState.scanParams.range.x.current * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[6].max;
    mainUI_1.lookSurface.elHeight = (newState.scanParams.range.y.current * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[7].max;
}
function sendMode(newMode) {
    fetch("/prismState/mode", {
        method: "PUT",
        body: JSON.stringify({ newMode }),
        headers: {
            "Content-type": "application/json"
        }
    });
}
exports.sendMode = sendMode;
//# sourceMappingURL=UIupdater.js.map