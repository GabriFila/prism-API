"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class SliderJoystickObj extends movObj_1.MovObj {
    constructor(element, area) {
        super(element, area);
        this.joyStart = (e) => {
            if (e.target === this.element) {
                this.joyActive = true;
                //set start position
                if (e.type === "touchstart") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        this.initialX = eTouch.touches[0].clientX - this.centerX;
                        this.initialY = eTouch.touches[0].clientY - this.centerY;
                    }
                }
                else {
                    this.initialX = e.clientX - this.centerX;
                    this.initialY = e.clientY - this.centerY;
                }
                this.setCenter();
                this.element.classList.remove("smooth-transition");
            }
        };
        this.joyMove = (e) => {
            //if user is touching
            if (this.joyActive) {
                let xOffset;
                let yOffset;
                e.preventDefault();
                //set offset position relative to top-left of draggable area
                if (e.type === "touchmove") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        xOffset = eTouch.touches[0].clientX - this.initialX;
                        yOffset = eTouch.touches[0].clientY - this.initialY;
                    }
                }
                else {
                    xOffset = e.clientX - this.initialX;
                    yOffset = e.clientY - this.initialY;
                }
                //stops movable element from going outside the draggable area when dragging it
                let areaWidth = this.areaWidth;
                let dragElWidth = this.elWidth;
                let areaHeight = this.areaHeight;
                let dragElHeight = this.elHeight;
                let padAreaBorderSize = this.areaBorderSize;
                if (xOffset + dragElWidth + 2 * padAreaBorderSize > areaWidth)
                    xOffset = areaWidth - dragElWidth - 2 * padAreaBorderSize;
                if (xOffset < 0)
                    xOffset = 0;
                if (yOffset + dragElHeight + 2 * padAreaBorderSize > areaHeight)
                    yOffset = areaHeight - dragElHeight - 2 * padAreaBorderSize;
                if (yOffset < 0)
                    yOffset = 0;
                this.leftRelPos = xOffset;
                this.topRelPos = yOffset;
            }
        };
        this.joyEnd = (e) => {
            this.moveToCenter();
            this.joyActive = false;
            this.element.classList.add("smooth-transition");
        };
        this.setCenter();
        this.moveToCenter();
        this.area.addEventListener("touchstart", this.joyStart);
        this.area.addEventListener("mousedown", this.joyStart);
        this.area.addEventListener("touchmove", this.joyMove);
        this.area.addEventListener("mousemove", this.joyMove);
        this.area.addEventListener("touchend", this.joyEnd);
        this.area.addEventListener("mouseup", this.joyEnd);
        window.addEventListener("resize", () => {
            this.setCenter();
            this.moveToCenter();
        });
    }
    get sliderValue() {
        console.log("center: " + this.centerY);
        return (this.topRelPos - this.centerY) / this.centerY;
    }
    setCenter() {
        this.centerX = this.areaWidth / 2 - this.elWidth / 2 - this.areaBorderSize;
        this.centerY = this.areaHeight / 2 - this.elHeight / 2 - this.areaBorderSize;
    }
    moveToCenter() {
        this.topRelPos = this.centerY;
        this.leftRelPos = this.centerX;
    }
}
exports.SliderJoystickObj = SliderJoystickObj;
//# sourceMappingURL=sliderJoystickObj.js.map