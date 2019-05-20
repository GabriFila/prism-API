"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinchObj_1 = require("./drag-pinch-joystick/pinchObj");
const scanParameteres_1 = require("./scanParameteres");
const toFromAPI_1 = require("../toFromAPI");
const inspectArea = document.querySelector("#scan-area");
const sampleArea = document.querySelector("#total-area");
exports.scanArea = new pinchObj_1.PinchObj(inspectArea, sampleArea, 20);
function setUpLookSurface() {
    //update own UI parameters
    exports.scanArea.area.addEventListener("touchmove", () => {
        scanParameteres_1.changeScanParam(scanParameteres_1.offsetX.id, (exports.scanArea.leftRelPos * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetX.id).max) / exports.scanArea.areaWidth, false);
        scanParameteres_1.changeScanParam(scanParameteres_1.offsetY.id, (exports.scanArea.topRelPos * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetY.id).max) / exports.scanArea.areaHeight, false);
        scanParameteres_1.changeScanParam(scanParameteres_1.rangeX.id, (exports.scanArea.elWidth * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeX.id).max) / exports.scanArea.areaWidth, false);
        scanParameteres_1.changeScanParam(scanParameteres_1.rangeY.id, (exports.scanArea.elHeight * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeY.id).max) / exports.scanArea.areaHeight, false);
    });
    window.addEventListener("resize", adatapLookSurface);
    //send parameter change when untouched
    exports.scanArea.area.addEventListener("touchend", () => {
        toFromAPI_1.sendPut("prismState/scanParams/offset/x", Number(scanParameteres_1.offsetX.value));
        toFromAPI_1.sendPut("prismState/scanParams/offset/y", Number(scanParameteres_1.offsetY.value));
        toFromAPI_1.sendPut("prismState/scanParams/range/x", Number(scanParameteres_1.rangeX.value));
        toFromAPI_1.sendPut("prismState/scanParams/range/y", Number(scanParameteres_1.rangeY.value));
    });
}
exports.setUpLookSurface = setUpLookSurface;
function adatapLookSurface() {
    exports.scanArea.leftRelPos = (Number(scanParameteres_1.offsetX.value) * exports.scanArea.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetX.id).max;
    exports.scanArea.topRelPos = (Number(scanParameteres_1.offsetY.value) * exports.scanArea.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetY.id).max;
    exports.scanArea.elWidth = (Number(scanParameteres_1.rangeX.value) * exports.scanArea.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeX.id).max;
    exports.scanArea.elHeight = (Number(scanParameteres_1.rangeY.value) * exports.scanArea.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeY.id).max;
}
exports.adatapLookSurface = adatapLookSurface;
//# sourceMappingURL=scanArea.js.map