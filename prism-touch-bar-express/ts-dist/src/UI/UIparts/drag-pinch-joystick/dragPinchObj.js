"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class DragPinchObj extends movObj_1.MovObj {
    constructor(element, area, elMinDim) {
        super(element, area);
        this.dragStart = (e) => {
            if (e.target === this.element) {
                this.dragActive = true;
                //set start position
                if (e.type === "touchstart") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        this.initialX = eTouch.touches[0].clientX - this.leftRelPos;
                        this.initialY = eTouch.touches[0].clientY - this.topRelPos;
                        console.log(`Drag leftrelpos x: ${this.leftRelPos}`);
                    }
                }
                else {
                    this.initialX = e.clientX - this.leftRelPos;
                    this.initialY = e.clientY - this.topRelPos;
                }
            }
            console.log("Drag start");
        };
        this.drag = (e) => {
            //if user is touching
            if (this.dragActive) {
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
                //stops draggable element from going outside the draggable area when dragging it
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
            this.dragActive = false;
        };
        this.pinchStart = (e) => {
            if (e.touches.length === 2) {
                if ((e.touches[0].target === this.area && e.touches[1].target === this.area) || e.touches) {
                    if (this.touchingOnlyRightPoints(e, this.element, this.area)) {
                        this.pinchActive = true;
                        this.dragActive = false;
                        this.initialPinchDistance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
                        this.areaMaxDim = Math.min(this.areaWidth - 2 * this.areaBorderSize, this.areaHeight - 2 * this.areaBorderSize);
                    }
                }
            }
        };
        this.pinch = (e) => {
            if (this.pinchActive) {
                e.preventDefault();
                if (e.touches.length === 2) {
                    this.pinchFactor =
                        Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)) /
                            this.initialPinchDistance;
                    //limitPinchFactor(this.pinchFactor);
                    this.pinchFactor = Math.pow(this.pinchFactor, 1 / 12);
                    let newWidth = this.elWidth * this.pinchFactor;
                    let newHeight = this.elHeight * this.pinchFactor;
                    if (newWidth > this.areaMaxDim)
                        newWidth = this.areaMaxDim;
                    if (newHeight > this.areaMaxDim)
                        newHeight = this.areaMaxDim;
                    if (newWidth < this.elMinDim)
                        newWidth = this.elMinDim;
                    if (newHeight < this.elMinDim)
                        newHeight = this.elMinDim;
                    if (newWidth + this.leftRelPos + this.areaWidth)
                        newWidth = this.elWidth;
                    /*
                    console.log("newwidth: "+ newWidth);
                     console.log("left rel pos: " + this.leftRelPos);
                     console.log("areawidth: " + this.areaWidth);
                    */
                    this.elWidth = newWidth;
                    this.elHeight = newHeight;
                    //console.log(`Pinch left: ${this.leftRelPos}`);
                }
            }
        };
        this.pinchEnd = () => {
            this.pinchActive = false;
        };
        this.area.addEventListener("mousedown", this.dragStart);
        this.area.addEventListener("touchstart", this.dragStart);
        this.area.addEventListener("mousemove", this.drag);
        this.area.addEventListener("touchmove", this.drag);
        this.area.addEventListener("mouseup", this.dragEnd);
        this.area.addEventListener("touchend", this.dragEnd);
        this.elMinDim = elMinDim;
        this.area.addEventListener("touchstart", this.pinchStart);
        this.area.addEventListener("touchmove", this.pinch);
        this.area.addEventListener("touchend", this.pinchEnd);
        this.dragActive = false;
        this.pinchActive = false;
    }
    touchingOnlyRightPoints(e, element, area) {
        return ((e.touches[0].target === area && e.touches[1].target === area) ||
            (e.touches[0].target === element && e.touches[1].target === element) ||
            (e.touches[0].target === element && e.touches[1].target === area) ||
            (e.touches[0].target === area && e.touches[1].target === element));
    }
}
exports.DragPinchObj = DragPinchObj;
//# sourceMappingURL=dragPinchObj.js.map