"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movInfo_1 = require("./movInfo");
const movInfo_2 = require("./movInfo");
const movInfo_3 = require("./movInfo");
class DragInfo extends movInfo_1.MovInfo {
    constructor(element, area) {
        super(element, area);
    }
}
exports.dragInfos = [new DragInfo(movInfo_3.inspectArea, movInfo_2.sampleArea)];
function dragStart(e) {
    exports.dragInfos.forEach((info) => {
        if (e.target === info.element) {
            info.active = true;
            //set start position
            if (e.type === "touchstart") {
                let eTouch = e;
                if ((eTouch).touches.length === 1) {
                    info.initialX = (eTouch).touches[0].clientX - info.relPos.left;
                    info.initialY = (eTouch).touches[0].clientY - info.relPos.top;
                }
            }
            else {
                info.initialX = e.clientX - info.relPos.left;
                info.initialY = e.clientY - info.relPos.top;
            }
        }
    });
}
exports.dragStart = dragStart;
function drag(e) {
    exports.dragInfos.forEach((info) => {
        //if user is touching
        if (info.active) {
            e.preventDefault();
            let currentX;
            let currentY;
            //set offset position relative to top-left of draggable area
            if (e.type === "touchmove") {
                let eTouch = e;
                if ((eTouch).touches.length === 1) {
                    currentX = (eTouch).touches[0].clientX - info.initialX;
                    currentY = (eTouch).touches[0].clientY - info.initialY;
                }
            }
            else {
                currentX = e.clientX - info.initialX;
                currentY = e.clientY - info.initialY;
            }
            //stops movable element from going outside the draggable area when dragging it
            let areaWidth = info.area.getBoundingClientRect().width;
            let dragElWidth = info.element.getBoundingClientRect().width;
            let areaHeight = info.area.getBoundingClientRect().height;
            let dragElHeight = info.element.getBoundingClientRect().height;
            let dragAreaBorderSize = movInfo_1.getBorderSize(info.area);
            if (currentX + dragElWidth + 2 * dragAreaBorderSize > areaWidth)
                currentX = areaWidth - dragElWidth - 2 * dragAreaBorderSize;
            if (currentX < 0)
                currentX = 0;
            if (currentY + dragElHeight + 2 * dragAreaBorderSize > areaHeight)
                currentY = areaHeight - dragElHeight - 2 * dragAreaBorderSize;
            if (currentY < 0)
                currentY = 0;
            info.setRelPosLeft(currentX);
            info.setRelPosTop(currentY);
            //translateToUI(currentX, currentY, info.element);
        }
    });
}
exports.drag = drag;
;
function dragEnd(e) {
    exports.dragInfos.forEach((info) => info.active = false);
}
exports.dragEnd = dragEnd;
//# sourceMappingURL=drag.js.map