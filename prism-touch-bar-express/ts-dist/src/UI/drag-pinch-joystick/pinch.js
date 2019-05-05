"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movInfo_1 = require("./movInfo");
const movInfo_2 = require("./movInfo");
const movInfo_3 = require("./movInfo");
class PinchInfo {
    constructor(pinchElement, pinchArea, elMinDim) {
        this.pinchELement = pinchElement;
        this.pinchArea = pinchArea;
        this.pinchActive = false;
        this.elMinDim = elMinDim;
    }
}
exports.pinchInfos = [new PinchInfo(movInfo_3.inspectArea, movInfo_2.sampleArea, 40)];
function pinchStart(e) {
    exports.pinchInfos.forEach(info => {
        if (e.touches.length === 2) {
            if (e.touches[0].target === info.pinchArea && e.touches[1].target === info.pinchArea ||
                e.touches) {
                if (touchingOnlyRightPoints(e, info.pinchELement, info.pinchArea)) {
                    info.pinchActive = true;
                    info.initialPinchDistance = Math.sqrt(Math.pow((e).touches[0].clientX - (e).touches[1].clientX, 2)
                        + Math.pow((e).touches[0].clientY - (e).touches[1].clientY, 2));
                    info.areaMaxDim = Math.min(info.pinchArea.getBoundingClientRect().width - 2 * movInfo_1.getBorderSize(info.pinchArea), info.pinchArea.getBoundingClientRect().height - 2 * movInfo_1.getBorderSize(info.pinchArea));
                }
            }
        }
    });
}
exports.pinchStart = pinchStart;
function pinch(e) {
    exports.pinchInfos.forEach((info, index) => {
        if (info.pinchActive) {
            e.preventDefault();
            if (e.touches.length === 2) {
                info.pinchFactor = Math.sqrt(Math.pow((e).touches[0].clientX - (e).touches[1].clientX, 2)
                    + Math.pow((e).touches[0].clientY - (e).touches[1].clientY, 2))
                    / info.initialPinchDistance;
                //limitPinchFactor(info.pinchFactor);
                info.pinchFactor = Math.pow(info.pinchFactor, 1 / 8);
                let newWidth = info.pinchELement.getBoundingClientRect().width * info.pinchFactor;
                let newHeight = info.pinchELement.getBoundingClientRect().height * info.pinchFactor;
                if (newWidth > info.areaMaxDim)
                    newWidth = info.areaMaxDim;
                if (newHeight > info.areaMaxDim)
                    newHeight = info.areaMaxDim;
                if (newWidth < info.elMinDim)
                    newWidth = info.elMinDim;
                if (newHeight < info.elMinDim)
                    newHeight = info.elMinDim;
                info.pinchELement.style.width = String(newWidth) + "px";
                info.pinchELement.style.height = String(newHeight) + "px";
            }
        }
    });
}
exports.pinch = pinch;
function pinchEnd() {
    exports.pinchInfos.forEach(info => { info.pinchActive = false; });
}
exports.pinchEnd = pinchEnd;
//Checks if user is only touching the element to pinch and/or the area where to pinch it
function touchingOnlyRightPoints(e, element, area) {
    return e.touches[0].target === area && e.touches[1].target === area ||
        e.touches[0].target === element && e.touches[1].target === element ||
        e.touches[0].target === element && e.touches[1].target === area ||
        e.touches[0].target === area && e.touches[1].target === element;
}
//# sourceMappingURL=pinch.js.map