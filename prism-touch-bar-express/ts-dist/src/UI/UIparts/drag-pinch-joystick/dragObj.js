"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class DragObj extends movObj_1.MovObj {
    constructor(element, area) {
        super(element, area);
        this.dragStart = (e) => {
            if (e.target === this.element) {
                this.active = true;
                //set start position
                if (e.type === "touchstart") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        this.initialX = eTouch.touches[0].clientX - this.leftRelPos;
                        this.initialY = eTouch.touches[0].clientY - this.topRelPos;
                    }
                }
                else {
                    this.initialX = e.clientX - this.leftRelPos;
                    this.initialY = e.clientY - this.topRelPos;
                }
            }
        };
        this.drag = (e) => {
            //if user is touching
            if (this.active) {
                e.preventDefault();
                let currentX;
                let currentY;
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
                //stops movable element from going outside the draggable area when dragging it
                let areaWidth = this.area.getBoundingClientRect().width;
                let elWidth = this.element.getBoundingClientRect().width;
                let areaHeight = this.area.getBoundingClientRect().height;
                let elHeight = this.element.getBoundingClientRect().height;
                let areaBorderSize = this.areaBorderSize;
                /*
                if (currentX + elWidth + 2 * areaBorderSize > areaWidth)
                currentX = areaWidth - elWidth - 2 * areaBorderSize;
                if (currentX < 0) currentX = 0;
                if (currentY + elHeight + 2 * areaBorderSize > areaHeight) currentY = areaHeight - elHeight - 2 * areaBorderSize;
                if (currentY < 0) currentY = 0;
          
                */
                if (currentX + this.elWidth + 2 * this.areaBorderSize > this.areaHeight)
                    currentX = this.areaWidth - this.elWidth - 2 * this.areaBorderSize;
                if (currentX < 0)
                    currentX = 0;
                if (currentY + this.elHeight + 2 * this.areaBorderSize > this.areaHeight)
                    currentY = this.areaHeight - this.elHeight - 2 * this.areaBorderSize;
                if (currentY < 0)
                    currentY = 0;
                this.leftRelPos = currentX;
                this.topRelPos = currentY;
            }
        };
        this.dragEnd = (e) => {
            this.active = false;
        };
        this.area.addEventListener("mousedown", this.dragStart);
        this.area.addEventListener("touchstart", this.dragStart);
        this.area.addEventListener("mousemove", this.drag);
        this.area.addEventListener("touchmove", this.drag);
        this.area.addEventListener("mouseup", this.dragEnd);
        this.area.addEventListener("touchend", this.dragEnd);
    }
}
exports.DragObj = DragObj;
//# sourceMappingURL=dragObj.js.map