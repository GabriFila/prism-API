"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dragObj_1 = require("./dragObj");
class CircJoystickObj extends dragObj_1.DragObj {
    constructor(element, area) {
        super(element, area);
        this.joyStart = (e) => {
            if (e.target === this.element) {
                this.joyActive = true;
                //set start position
                if (e.type === "touchstart") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        this.initialX = eTouch.touches[0].clientX - this.relCenterX;
                        this.initialY = eTouch.touches[0].clientY - this.relCenterY;
                    }
                }
                else {
                    this.initialX = e.clientX - this.relCenterX;
                    this.initialY = e.clientY - this.relCenterY;
                }
                this.element.classList.remove("smooth-transition");
            }
        };
        this.joyMove = (e) => {
            //if user is touching
            if (this.joyActive) {
                let currentX;
                let currentY;
                e.preventDefault();
                //set offset position relative to top-left of draggable area
                if (e.type === "touchmove") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        currentX = eTouch.touches[0].clientX - this.initialX;
                        currentY = eTouch.touches[0].clientY - this.initialY;
                    }
                }
                else {
                    currentX = e.clientX - this.initialX;
                    currentY = e.clientY - this.initialY;
                }
                this.setPolar(currentX, currentY);
            }
        };
        this.joyEnd = (e) => {
            this.moveToCenter();
            this.joyActive = false;
            this.element.classList.add("smooth-transition");
        };
        this.updateCenter();
        this.moveToCenter();
        this.updateMaxMag();
        this.area.addEventListener("touchstart", this.joyStart);
        this.area.addEventListener("mousedown", this.joyStart);
        this.area.addEventListener("touchmove", this.joyMove);
        this.area.addEventListener("mousemove", this.joyMove);
        this.area.addEventListener("touchend", this.joyEnd);
        this.area.addEventListener("mouseup", this.joyEnd);
        window.addEventListener("resize", () => {
            this.updateCenter();
            this.moveToCenter();
            this.updateMaxMag();
        });
    }
    setPolar(left, top) {
        let a = left - this.relCenterX;
        let b = -(top - this.relCenterY);
        this.mag = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (a >= 0)
            this.arg = Math.atan(b / a);
        else
            this.arg = Math.atan(b / a) + Math.PI;
        if (this.mag >= this.maxMag)
            this.mag = this.maxMag;
        let newLeft = this.relCenterX + this.mag * Math.cos(this.arg);
        let newTop = this.relCenterY - this.mag * Math.sin(this.arg);
        this.leftRelPos = newLeft;
        this.topRelPos = newTop;
    }
    updateCenter() {
        this.relCenterX = this.areaWidth / 2 - this.elWidth / 2 - this.areaBorderSize;
        this.relCenterY = this.areaHeight / 2 - this.elHeight / 2 - this.areaBorderSize;
    }
    moveToCenter() {
        this.topRelPos = this.relCenterY;
        this.leftRelPos = this.relCenterX;
    }
    updateMaxMag() {
        if (this.areaWidth <= this.areaHeight)
            this.maxMag = 0.9 * (this.areaWidth / 2 - this.elWidth / 2 - this.elBorderSize);
        else
            this.maxMag = 0.9 * (this.areaHeight / 2 - this.elHeight / 2 - this.elBorderSize);
    }
}
exports.CircJoystickObj = CircJoystickObj;
//# sourceMappingURL=circJoystick.js.map