"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanParameteres_1 = require("./UIparts/scanParameteres");
const lasers_1 = require("./UIparts/lasers");
const mainUI_1 = require("./mainUI");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("offset-x-updated", (event) => {
        scanParameteres_1.UIparameters[0].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.leftRelPos = (Number(scanParameteres_1.UIparameters[0].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
    });
    source.addEventListener("offset-y-updated", (event) => {
        scanParameteres_1.UIparameters[1].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.topRelPos = (Number(scanParameteres_1.UIparameters[1].value) * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[1].max;
    });
    source.addEventListener("offset-z-updated", (event) => {
        scanParameteres_1.UIparameters[2].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-x-updated", (event) => {
        scanParameteres_1.UIparameters[3].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-y-updated", (event) => {
        scanParameteres_1.UIparameters[4].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-z-updated", (event) => {
        scanParameteres_1.UIparameters[5].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("range-x-updated", (event) => {
        scanParameteres_1.UIparameters[6].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.elWidth = (Number(scanParameteres_1.UIparameters[6].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[6].max;
    });
    source.addEventListener("range-y-updated", (event) => {
        scanParameteres_1.UIparameters[7].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.elHeight = (Number(scanParameteres_1.UIparameters[7].value) * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[7].max;
    });
    source.addEventListener("range-z-updated", (event) => {
        scanParameteres_1.UIparameters[8].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("dwellTime-updated", (event) => {
        scanParameteres_1.UIparameters[9].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("lasers-updated", (event) => {
        lasers_1.updateUILasersFromLasers(JSON.parse(event.data));
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
    console.log(`Before ${mainUI_1.lookSurface.leftRelPos}`);
    mainUI_1.lookSurface.leftRelPos = (newState.scanParams.offset.x.current * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
    console.log(`After ${mainUI_1.lookSurface.leftRelPos}`);
    console.log("   ");
    mainUI_1.lookSurface.topRelPos = (newState.scanParams.offset.y.current * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[1].max;
    mainUI_1.lookSurface.elWidth = (newState.scanParams.range.x.current * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[6].max;
    mainUI_1.lookSurface.elHeight = (newState.scanParams.range.y.current * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[7].max;
}
//# sourceMappingURL=UIupdater.js.map