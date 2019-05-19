"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinchObj_1 = require("./drag-pinch-joystick/pinchObj");
const movObj_1 = require("./drag-pinch-joystick/movObj");
const limits_1 = require("./limits");
const scanParameteres_1 = require("./scanParameteres");
const toFromAPI_1 = require("../toFromAPI");
exports.lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
function setUpLookSurface() {
    //update own UI parameters
    exports.lookSurface.area.addEventListener("touchmove", () => {
        scanParameteres_1.offsetX.value = ((exports.lookSurface.leftRelPos * limits_1.limits.find(limit => limit.id == "scanParams-offset-x").max) / exports.lookSurface.areaWidth).toPrecision(4);
        scanParameteres_1.offsetY.value = ((exports.lookSurface.topRelPos * limits_1.limits.find(limit => limit.id == "scanParams-offset-y").max) / exports.lookSurface.areaHeight).toPrecision(4);
        scanParameteres_1.rangeX.value = ((exports.lookSurface.elWidth * limits_1.limits.find(limit => limit.id == "scanParams-range-x").max) / exports.lookSurface.areaWidth).toPrecision(4);
        scanParameteres_1.rangeY.value = ((exports.lookSurface.elHeight * limits_1.limits.find(limit => limit.id == "scanParams-range-y").max) / exports.lookSurface.areaHeight).toPrecision(4);
    });
    //send parameter change when untouched
    exports.lookSurface.area.addEventListener("touchend", () => {
        toFromAPI_1.sendPut("prismState/scanParams/offset/x", Number(scanParameteres_1.offsetX.value));
        toFromAPI_1.sendPut("prismState/scanParams/offset/y", Number(scanParameteres_1.offsetY.value));
        toFromAPI_1.sendPut("prismState/scanParams/range/x", Number(scanParameteres_1.rangeX.value));
        toFromAPI_1.sendPut("prismState/scanParams/range/y", Number(scanParameteres_1.rangeY.value));
    });
}
exports.setUpLookSurface = setUpLookSurface;
//# sourceMappingURL=lookSurface.js.map