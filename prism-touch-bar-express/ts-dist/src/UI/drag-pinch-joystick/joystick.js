"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movInfo_1 = require("./movInfo");
const movInfo_2 = require("./movInfo");
const movInfo_3 = require("./movInfo");
class JoystickInfo extends movInfo_1.MovInfo {
    constructor(element, area) {
        super(element, area);
        this.setDefaultXY();
        this.moveToDefaultXY();
    }
    setDefaultXY() {
        this.defaultX = this.area.getBoundingClientRect().width / 2 - this.element.getBoundingClientRect().width / 2 - movInfo_1.getBorderSize(this.area);
        this.defaultY = this.area.getBoundingClientRect().height / 2 - this.element.getBoundingClientRect().height / 2 - movInfo_1.getBorderSize(this.area);
    }
    moveToDefaultXY() {
        this.setRelPosTop(this.defaultY);
        this.setRelPosLeft(this.defaultX);
    }
}
exports.joystickInfos = [new JoystickInfo(movInfo_3.joyThumb, movInfo_3.joyPad), new JoystickInfo(movInfo_2.zThumb, movInfo_2.zSlider)];
function joyStart(e) {
    exports.joystickInfos.forEach((info) => {
        if (e.target === info.element) {
            info.active = true;
            //set start position
            if (e.type === "touchstart") {
                let eTouch = e;
                if ((eTouch).touches.length === 1) {
                    info.initialX = (eTouch).touches[0].clientX - info.defaultX;
                    info.initialY = (eTouch).touches[0].clientY - info.defaultY;
                }
            }
            else {
                info.initialX = e.clientX - info.defaultX;
                info.initialY = e.clientY - info.defaultY;
            }
            info.setDefaultXY();
            info.element.classList.remove("smooth-transition");
        }
    });
}
exports.joyStart = joyStart;
function joyMove(e) {
    exports.joystickInfos.forEach((info) => {
        //if user is touching
        if (info.active) {
            let xOffset;
            let yOffset;
            e.preventDefault();
            //set offset position relative to top-left of draggable area
            if (e.type === "touchmove") {
                let eTouch = e;
                if ((eTouch).touches.length === 1) {
                    xOffset = (eTouch).touches[0].clientX - info.initialX;
                    yOffset = (eTouch).touches[0].clientY - info.initialY;
                }
            }
            else {
                xOffset = e.clientX - info.initialX;
                yOffset = e.clientY - info.initialY;
            }
            //stops movable element from going outside the draggable area when dragging it
            let areaWidth = info.area.getBoundingClientRect().width;
            let dragElWidth = info.element.getBoundingClientRect().width;
            let areaHeight = info.area.getBoundingClientRect().height;
            let dragElHeight = info.element.getBoundingClientRect().height;
            let padAreaBorderSize = movInfo_1.getBorderSize(info.area);
            if (xOffset + dragElWidth + 2 * padAreaBorderSize > areaWidth)
                xOffset = areaWidth - dragElWidth - 2 * padAreaBorderSize;
            if (xOffset < 0)
                xOffset = 0;
            if (yOffset + dragElHeight + 2 * padAreaBorderSize > areaHeight)
                yOffset = areaHeight - dragElHeight - 2 * padAreaBorderSize;
            if (yOffset < 0)
                yOffset = 0;
            movInfo_1.translateToUI(xOffset, yOffset, info.element);
        }
    });
}
exports.joyMove = joyMove;
;
function joyEnd(e) {
    exports.joystickInfos.forEach((info) => {
        info.moveToDefaultXY();
        info.active = false;
        info.element.classList.add("smooth-transition");
    });
}
exports.joyEnd = joyEnd;
//# sourceMappingURL=joystick.js.map