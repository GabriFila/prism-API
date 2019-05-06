"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class JoystickObj extends movObj_1.MovObj {
    constructor(element, area) {
        super(element, area);
        this.joyStart = (e) => {
            if (e.target === this.element) {
                this.active = true;
                //set start position
                if (e.type === "touchstart") {
                    let eTouch = e;
                    if (eTouch.touches.length === 1) {
                        this.initialX = eTouch.touches[0].clientX - this.defaultX;
                        this.initialY = eTouch.touches[0].clientY - this.defaultY;
                    }
                }
                else {
                    this.initialX = e.clientX - this.defaultX;
                    this.initialY = e.clientY - this.defaultY;
                }
                this.setDefaultXY();
                this.element.classList.remove("smooth-transition");
            }
        };
        this.joyMove = (e) => {
            //if user is touching
            if (this.active) {
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
                let areaWidth = this.area.getBoundingClientRect().width;
                let dragElWidth = this.element.getBoundingClientRect().width;
                let areaHeight = this.area.getBoundingClientRect().height;
                let dragElHeight = this.element.getBoundingClientRect().height;
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
            this.moveToDefaultXY();
            this.active = false;
            this.element.classList.add("smooth-transition");
        };
        this.setDefaultXY();
        this.moveToDefaultXY();
        this.area.addEventListener("touchstart", this.joyStart);
        this.area.addEventListener("mousedown", this.joyStart);
        this.area.addEventListener("touchmove", this.joyMove);
        this.area.addEventListener("mousemove", this.joyMove);
        this.area.addEventListener("touchend", this.joyEnd);
        this.area.addEventListener("mouseup", this.joyEnd);
    }
    setDefaultXY() {
        this.defaultX = this.area.getBoundingClientRect().width / 2 - this.element.getBoundingClientRect().width / 2 - this.areaBorderSize;
        this.defaultY = this.area.getBoundingClientRect().height / 2 - this.element.getBoundingClientRect().height / 2 - this.areaBorderSize;
        console.log(`X: ${this.defaultX}`);
        console.log(`Y: ${this.defaultY}`);
    }
    moveToDefaultXY() {
        this.topRelPos = this.defaultY;
        this.leftRelPos = this.defaultX;
    }
}
exports.JoystickObj = JoystickObj;
/*
export function joyStart(e: TouchEvent | MouseEvent) {
  joystickInfos.forEach(info => {
    if (e.target === info.element) {
      info.active = true;
      //set start position
      if (e.type === "touchstart") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          info.initialX = eTouch.touches[0].clientX - info.defaultX;
          info.initialY = eTouch.touches[0].clientY - info.defaultY;
        }
      } else {
        info.initialX = (e as MouseEvent).clientX - info.defaultX;
        info.initialY = (e as MouseEvent).clientY - info.defaultY;
      }
      info.setDefaultXY();
      info.element.classList.remove("smooth-transition");
    }
  });
}


export function joyMove(e: TouchEvent | MouseEvent) {
  joystickInfos.forEach(info => {
    //if user is touching
    if (info.active) {
      let xOffset;
      let yOffset;
      e.preventDefault();
      //set offset position relative to top-left of draggable area
      if (e.type === "touchmove") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          xOffset = eTouch.touches[0].clientX - info.initialX;
          yOffset = eTouch.touches[0].clientY - info.initialY;
        }
      } else {
        xOffset = (e as MouseEvent).clientX - info.initialX;
        yOffset = (e as MouseEvent).clientY - info.initialY;
      }

      //stops movable element from going outside the draggable area when dragging it
      let areaWidth: number = info.area.getBoundingClientRect().width;
      let dragElWidth: number = info.element.getBoundingClientRect().width;
      let areaHeight: number = info.area.getBoundingClientRect().height;
      let dragElHeight: number = info.element.getBoundingClientRect().height;
      let padAreaBorderSize: number = getBorderSize(info.area);

      if (xOffset + dragElWidth + 2 * padAreaBorderSize > areaWidth) xOffset = areaWidth - dragElWidth - 2 * padAreaBorderSize;
      if (xOffset < 0) xOffset = 0;
      if (yOffset + dragElHeight + 2 * padAreaBorderSize > areaHeight) yOffset = areaHeight - dragElHeight - 2 * padAreaBorderSize;
      if (yOffset < 0) yOffset = 0;

      translateToUI(xOffset, yOffset, info.element);
    }
  });
}


export function joyEnd(e: TouchEvent | MouseEvent) {
  joystickInfos.forEach(info => {
    info.moveToDefaultXY();
    info.active = false;
    info.element.classList.add("smooth-transition");
  });
}
*/
//# sourceMappingURL=joystickObj.js.map