"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class DragObj extends movObj_1.MovObj {
    constructor(element, area) {
        super(element, area);
        this.dragStart = (e) => {
            alert(this.initialX);
            this.topRelPos = 100;
            if (e.target === this.element) {
                alert("touched");
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
        this.area.addEventListener("mousedown", this.dragStart);
        this.area.addEventListener("touchstart", this.dragStart);
        this.area.addEventListener("mousemove", this.drag);
        this.area.addEventListener("touchmove", this.drag);
        this.area.addEventListener("mouseup", this.dragEnd);
        this.area.addEventListener("touchend", this.dragEnd);
    }
    drag(e) {
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
            let dragElWidth = this.element.getBoundingClientRect().width;
            let areaHeight = this.area.getBoundingClientRect().height;
            let dragElHeight = this.element.getBoundingClientRect().height;
            let dragAreaBorderSize = this.areaBorderSize;
            if (currentX + dragElWidth + 2 * dragAreaBorderSize > areaWidth)
                currentX = areaWidth - dragElWidth - 2 * dragAreaBorderSize;
            if (currentX < 0)
                currentX = 0;
            if (currentY + dragElHeight + 2 * dragAreaBorderSize > areaHeight)
                currentY = areaHeight - dragElHeight - 2 * dragAreaBorderSize;
            if (currentY < 0)
                currentY = 0;
            this.leftRelPos = currentX;
            this.topRelPos = currentY;
        }
    }
    dragEnd(e) {
        this.active = false;
    }
}
exports.DragObj = DragObj;
//export const dragObjs: DragInfo[] = [new DragInfo(inspectArea, sampleArea)];
/*
export function dragStart(e: TouchEvent | MouseEvent) {
  dragObjs.forEach(info => {
    if (e.target === info.element) {
      info.active = true;
      //set start position
      if (e.type === "touchstart") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          info.initialX = eTouch.touches[0].clientX - info.leftRelPos;
          info.initialY = eTouch.touches[0].clientY - info.topRelPos;
        }
      } else {
        info.initialX = (e as MouseEvent).clientX - info.leftRelPos;
        info.initialY = (e as MouseEvent).clientY - info.topRelPos;
      }
    }
  });
}

export function drag(e: TouchEvent | MouseEvent) {
  dragObjs.forEach(info => {
    //if user is touching
    if (info.active) {
      e.preventDefault();
      let currentX;
      let currentY;
      //set offset position relative to top-left of draggable area
      if (e.type === "touchmove") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          currentX = eTouch.touches[0].clientX - info.initialX;
          currentY = eTouch.touches[0].clientY - info.initialY;
        }
      } else {
        currentX = (e as MouseEvent).clientX - info.initialX;
        currentY = (e as MouseEvent).clientY - info.initialY;
      }

      //stops movable element from going outside the draggable area when dragging it
      let areaWidth: number = info.area.getBoundingClientRect().width;
      let dragElWidth: number = info.element.getBoundingClientRect().width;
      let areaHeight: number = info.area.getBoundingClientRect().height;
      let dragElHeight: number = info.element.getBoundingClientRect().height;
      let dragAreaBorderSize: number = info.areaBorderSize;

      if (currentX + dragElWidth + 2 * dragAreaBorderSize > areaWidth) currentX = areaWidth - dragElWidth - 2 * dragAreaBorderSize;
      if (currentX < 0) currentX = 0;
      if (currentY + dragElHeight + 2 * dragAreaBorderSize > areaHeight) currentY = areaHeight - dragElHeight - 2 * dragAreaBorderSize;
      if (currentY < 0) currentY = 0;

      info.leftRelPos = currentX;
      info.topRelPos = currentY;
    }
  });
}


export function dragEnd(e: TouchEvent | MouseEvent) {
  dragObjs.forEach(info => (info.active = false));
}
*/
//# sourceMappingURL=dragObj.js.map