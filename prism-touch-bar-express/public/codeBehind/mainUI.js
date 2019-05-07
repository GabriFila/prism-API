(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LaserUIBox {
    constructor(box, waveLengthLabel, slider, btn, powerLabel, visible, position) {
        this.box = box;
        this.waveLengthLabel = waveLengthLabel;
        this.slider = slider;
        this.btn = btn;
        this.powerLabel = powerLabel;
        this.visible = visible;
        this.position = position;
        this.isOn = false;
    }
}
const laserBox0 = document.querySelector("#slider-box-0");
const laserBox1 = document.querySelector("#slider-box-1");
const laserBox2 = document.querySelector("#slider-box-2");
const laserBox3 = document.querySelector("#slider-box-3");
const laserPower0 = document.querySelector("#slider-value-0");
const laserPower1 = document.querySelector("#slider-value-1");
const laserPower2 = document.querySelector("#slider-value-2");
const laserPower3 = document.querySelector("#slider-value-3");
const laserSlider0 = document.querySelector("#slider-0");
const laserSlider1 = document.querySelector("#slider-1");
const laserSlider2 = document.querySelector("#slider-2");
const laserSlider3 = document.querySelector("#slider-3");
const laserOnOffBtn0 = document.querySelector("#laser-on-off-btn-0");
const laserOnOffBtn1 = document.querySelector("#laser-on-off-btn-1");
const laserOnOffBtn2 = document.querySelector("#laser-on-off-btn-2");
const laserOnOffBtn3 = document.querySelector("#laser-on-off-btn-3");
const laserWaveLength0 = document.querySelector("#laser-type-0");
const laserWaveLength1 = document.querySelector("#laser-type-1");
const laserWaveLength2 = document.querySelector("#laser-type-2");
const laserWaveLength3 = document.querySelector("#laser-type-3");
exports.laserUIBoxes = [
    new LaserUIBox(laserBox0, laserWaveLength0, laserSlider0, laserOnOffBtn0, laserPower0, true, 0),
    new LaserUIBox(laserBox1, laserWaveLength1, laserSlider1, laserOnOffBtn1, laserPower1, true, 1),
    new LaserUIBox(laserBox2, laserWaveLength2, laserSlider2, laserOnOffBtn2, laserPower2, true, 2),
    new LaserUIBox(laserBox3, laserWaveLength3, laserSlider3, laserOnOffBtn3, laserPower3, true, 3)
];
function grayOutLaserBox(laserBox) {
    laserBox.slider.disabled = true;
    laserBox.box.classList.add("grayed-out");
    laserBox.btn.classList.remove("laser-btn-on");
    laserBox.btn.classList.add("laser-btn-off");
}
exports.grayOutLaserBox = grayOutLaserBox;
function lightUpLaserBox(laserBox) {
    laserBox.slider.disabled = false;
    laserBox.box.classList.remove("grayed-out");
    laserBox.btn.classList.remove("laser-btn-off");
    laserBox.btn.classList.add("laser-btn-on");
}
exports.lightUpLaserBox = lightUpLaserBox;
function updateUILasers(state) {
    exports.laserUIBoxes.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= state.lasers.length)
            exports.laserUIBoxes[i].visible = false;
        else {
            exports.laserUIBoxes[i].powerLabel.innerHTML = state.lasers[i].power.toString() + "%";
            exports.laserUIBoxes[i].slider.value = state.lasers[i].power.toString();
            exports.laserUIBoxes[i].waveLengthLabel.innerHTML = state.lasers[i].waveLength.toString() + "nm";
            if (state.lasers[i].isOn)
                lightUpLaserBox(exports.laserUIBoxes[i]);
            else
                grayOutLaserBox(exports.laserUIBoxes[i]);
        }
    });
}
exports.updateUILasers = updateUILasers;
function sendLaserData(laserBox) {
    fetch(`prismState/lasers/${Number(laserBox.waveLengthLabel.innerHTML.slice(0, -1).slice(0, -1))}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            newPower: Number(laserBox.powerLabel.innerHTML.slice(0, -1)),
            isOn: laserBox.isOn
        })
    })
        .then(res => res.json())
        .then(res => console.log(res.body));
}
exports.sendLaserData = sendLaserData;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const btn0 = document.querySelector("#btn0");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");
const btn6 = document.querySelector("#btn6");
const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");
exports.dotBtn = document.querySelector("#btnDot");
exports.delBtn = document.querySelector("#btnDel");
exports.numPad = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaxMin {
    constructor() {
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
/*
export class Preset {
    name: string;
    param: ParamState;
    constructor(name: string, param: ParamState) {
        this.name = name;
        this.param = param;
    }
}
*/
//export const presets: Preset[] = [];
const offsetX = document.querySelector("#offset-X");
const offsetY = document.querySelector("#offset-Y");
const offsetZ = document.querySelector("#offset-Z");
const pixelNumberX = document.querySelector("#pixel-number-X");
const pixelNumberY = document.querySelector("#pixel-number-Y");
const pixelNumberZ = document.querySelector("#pixel-number-Z");
const rangeX = document.querySelector("#range-X");
const rangeY = document.querySelector("#range-Y");
const rangeZ = document.querySelector("#range-Z");
const dwellTime = document.querySelector("#dwell-time");
const totalTime = document.querySelector("#total-time");
exports.UIparameters = [
    offsetX,
    offsetY,
    offsetZ,
    pixelNumberX,
    pixelNumberY,
    pixelNumberZ,
    rangeX,
    rangeY,
    rangeZ,
    dwellTime
];
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
exports.limits = [];
//fills limits
exports.UIparameters.forEach(() => exports.limits.push(new MaxMin()));
function sendParamChange(param) {
    let target = param.id;
    let resource;
    let dim = "offset";
    switch (target) {
        case "offset-X":
            resource = "offset/X";
            break;
        case "offset-Y":
            resource = "offset/Y";
            break;
        case "offset-Z":
            resource = "offset/Z";
            break;
        case "pixel-number-X":
            resource = "pixelNumber/X";
            break;
        case "pixel-number-Y":
            resource = "pixelNumber/Y";
            break;
        case "pixel-number-Z":
            resource = "pixelNumber/Z";
            break;
        case "range-X":
            resource = "range/X";
            break;
        case "range-Y":
            resource = "range/Y";
            break;
        case "range-Z":
            resource = "range/Z";
            break;
        case "dwell-time":
            resource = "dwellTime";
            break;
    }
    fetch("/prismState/scanParams/" + resource, {
        method: "PUT",
        body: JSON.stringify({
            newValue: Number(param.value)
        }),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    });
}
exports.sendParamChange = sendParamChange;
function updateUIParameters(state) {
    exports.UIparameters[0].value = state.scanParams.offset.x.current.toString();
    exports.UIparameters[1].value = state.scanParams.offset.y.current.toString();
    exports.UIparameters[2].value = state.scanParams.offset.z.current.toString();
    exports.UIparameters[3].value = state.scanParams.pixelNumber.x.current.toString();
    exports.UIparameters[4].value = state.scanParams.pixelNumber.y.current.toString();
    exports.UIparameters[5].value = state.scanParams.pixelNumber.z.current.toString();
    exports.UIparameters[6].value = state.scanParams.range.x.current.toString();
    exports.UIparameters[7].value = state.scanParams.range.y.current.toString();
    exports.UIparameters[8].value = state.scanParams.range.z.current.toString();
    exports.UIparameters[9].value = state.scanParams.dwellTime.toString();
}
exports.updateUIParameters = updateUIParameters;
function updateLimits(newState) {
    exports.limits[0].max = newState.scanParams.offset.x.max;
    exports.limits[0].min = newState.scanParams.offset.x.min;
    exports.limits[1].max = newState.scanParams.offset.y.max;
    exports.limits[1].min = newState.scanParams.offset.y.min;
    exports.limits[2].max = newState.scanParams.offset.z.max;
    exports.limits[2].min = newState.scanParams.offset.z.min;
    exports.limits[3].max = newState.scanParams.pixelNumber.x.max;
    exports.limits[3].min = newState.scanParams.pixelNumber.x.min;
    exports.limits[4].max = newState.scanParams.pixelNumber.y.max;
    exports.limits[4].min = newState.scanParams.pixelNumber.y.min;
    exports.limits[5].max = newState.scanParams.pixelNumber.z.max;
    exports.limits[5].min = newState.scanParams.pixelNumber.z.min;
    exports.limits[6].max = newState.scanParams.range.x.max;
    exports.limits[6].min = newState.scanParams.range.x.min;
    exports.limits[7].max = newState.scanParams.range.y.max;
    exports.limits[7].min = newState.scanParams.range.y.min;
    exports.limits[8].max = newState.scanParams.range.z.max;
    exports.limits[8].min = newState.scanParams.range.z.min;
}
exports.updateLimits = updateLimits;

},{}],4:[function(require,module,exports){
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
                /*
                if (currentX + this.elWidth + this.areaBorderSize > this.areaHeight) currentX = this.areaWidth - this.elWidth - this.areaBorderSize;
                if (currentX < 0) currentX = 0;
                if (currentY + this.elHeight + this.areaBorderSize > this.areaHeight)
                  currentY = this.areaHeight - this.elHeight - this.areaBorderSize;
                if (currentY < 0) currentY = 0;
          */
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

},{"./movObj":6}],5:[function(require,module,exports){
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

},{"./movObj":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MovObj {
    get elWidth() {
        return this._elWidth;
    }
    set elWidth(value) {
        this.element.style.width = String(value) + "px";
        this._elWidth = value;
    }
    get elHeight() {
        return this._elHeight;
    }
    set elHeight(value) {
        this.element.style.height = String(value) + "px";
        this._elHeight = value;
    }
    get areaWidth() {
        return this._areaWidth;
    }
    get areaHeight() {
        return this._areaHeight;
    }
    get elBorderSize() {
        return this._elBorderSize;
    }
    get areaBorderSize() {
        return this._areaBorderSize;
    }
    get topRelPos() {
        return this._topRelPos;
    }
    set topRelPos(value) {
        this._topRelPos = value;
        this.translateToUI(this._leftRelPos, this._topRelPos, this.element);
    }
    get leftRelPos() {
        return this._leftRelPos;
    }
    set leftRelPos(value) {
        this._leftRelPos = value;
        this.translateToUI(this._leftRelPos, this.topRelPos, this.element);
    }
    constructor(element, area) {
        this.element = element;
        this.area = area;
        this.active = false;
        this.updateElBorderSize();
        this.updateAreaBorderSize();
        this.updateWidthHeight();
        this.updateTopLeftRelPos();
    }
    updateTopLeftRelPos() {
        this._topRelPos =
            this.element.getBoundingClientRect().top - this.element.parentElement.getBoundingClientRect().top - this.elBorderSize - 1;
        this._leftRelPos =
            this.element.getBoundingClientRect().left - this.element.parentElement.getBoundingClientRect().left - this.elBorderSize - 1;
    }
    updateWidthHeight() {
        this._elWidth = this.element.getBoundingClientRect().width;
        this._elHeight = this.element.getBoundingClientRect().height;
        this._areaWidth = this.area.getBoundingClientRect().width;
        this._areaHeight = this.area.getBoundingClientRect().height;
    }
    updateElBorderSize() {
        let elStyle = window.getComputedStyle(this.element);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        this._elBorderSize = Number(regex.exec(str)[1]);
    }
    updateAreaBorderSize() {
        let elStyle = window.getComputedStyle(this.element);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        this._areaBorderSize = Number(regex.exec(str)[1]);
    }
    translateToUI(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}
exports.MovObj = MovObj;
exports.inspectArea = document.querySelector("#inspect-area-0");
exports.zThumb = document.querySelector("#z-thumb");
exports.sampleArea = document.querySelector("#sample-area");
exports.zSlider = document.querySelector("#z-slider");
exports.joyPad = document.querySelector("#joystick-pad");
exports.joyThumb = document.querySelector("#joystick-thumb");
exports.zSensBtn = document.querySelector("#z-sens-btn");
exports.zSenses = ["0.1x", "0.5x", "1x"];

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class PinchObj extends movObj_1.MovObj {
    constructor(element, area, elMinDim) {
        super(element, area);
        this.pinchStart = (e) => {
            if (e.touches.length === 2) {
                if ((e.touches[0].target === this.area && e.touches[1].target === this.area) || e.touches) {
                    if (this.touchingOnlyRightPoints(e, this.element, this.area)) {
                        this.active = true;
                        this.initialPinchDistance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
                        this.areaMaxDim = Math.min(this.area.getBoundingClientRect().width - 2 * this.areaBorderSize, this.area.getBoundingClientRect().height - 2 * this.areaBorderSize);
                    }
                }
            }
        };
        this.pinch = (e) => {
            if (this.active) {
                e.preventDefault();
                if (e.touches.length === 2) {
                    this.pinchFactor =
                        Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)) /
                            this.initialPinchDistance;
                    //limitPinchFactor(this.pinchFactor);
                    this.pinchFactor = Math.pow(this.pinchFactor, 1 / 12);
                    let newWidth = this.element.getBoundingClientRect().width * this.pinchFactor;
                    let newHeight = this.element.getBoundingClientRect().height * this.pinchFactor;
                    if (newWidth > this.areaMaxDim)
                        newWidth = this.areaMaxDim;
                    if (newHeight > this.areaMaxDim)
                        newHeight = this.areaMaxDim;
                    if (newWidth < this.elMinDim)
                        newWidth = this.elMinDim;
                    if (newHeight < this.elMinDim)
                        newHeight = this.elMinDim;
                    this.element.style.width = String(newWidth) + "px";
                    this.element.style.height = String(newHeight) + "px";
                }
            }
        };
        this.pinchEnd = () => {
            this.active = false;
        };
        this.elMinDim = elMinDim;
        this.area.addEventListener("touchstart", this.pinchStart);
        this.area.addEventListener("touchmove", this.pinch);
        this.area.addEventListener("touchend", this.pinchEnd);
    }
    touchingOnlyRightPoints(e, element, area) {
        return ((e.touches[0].target === area && e.touches[1].target === area) ||
            (e.touches[0].target === element && e.touches[1].target === element) ||
            (e.touches[0].target === element && e.touches[1].target === area) ||
            (e.touches[0].target === area && e.touches[1].target === element));
    }
}
exports.PinchObj = PinchObj;

},{"./movObj":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*slider initialization*/
const lasers_1 = require("./UIparts/lasers");
/*numpad initialization*/
const numpad_1 = require("./UIparts/numpad");
/*parameters initialization*/
const scanParameteres_1 = require("./UIparts/scanParameteres");
/*drag capabilties*/
const dragObj_1 = require("./drag-pinch-joystick/dragObj");
/*joystick capabilties*/
const joystickObj_1 = require("./drag-pinch-joystick/joystickObj");
/*pinch capabilties*/
const pinchObj_1 = require("./drag-pinch-joystick/pinchObj");
/*z slider sensitivity */
const movObj_1 = require("./drag-pinch-joystick/movObj");
/*last item in focus*/
let lastFocus = undefined;
/*start btn  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
document.body.addEventListener("click", function (e) {
    //remove highlight border only when touching something excluding numpad and selectred parameter
    if (numpad_1.numPad.filter(numBtn => numBtn === e.target).length == 0) {
        if (e.target !== numpad_1.delBtn && e.target !== numpad_1.dotBtn)
            if (scanParameteres_1.UIparameters.filter(param => param === e.target).length == 0) {
                removeHighlithBoder();
                lastFocus = null;
            }
    }
    //set UI parameter value to 0 when empty
    scanParameteres_1.UIparameters.forEach(param => {
        if (param != lastFocus)
            if (param.value == "") {
                param.value = "0";
            }
    });
});
//adds event to slider box for slider movement and on/off button
lasers_1.laserUIBoxes.forEach(laserUIBox => {
    laserUIBox.slider.oninput = () => {
        let tempValue = laserUIBox.slider.value;
        laserUIBox.powerLabel.innerHTML = tempValue + "%";
    };
    laserUIBox.btn.addEventListener("click", () => {
        laserUIBox.isOn = !laserUIBox.isOn;
        if (laserUIBox.isOn)
            lasers_1.grayOutLaserBox(laserUIBox);
        else
            lasers_1.lightUpLaserBox(laserUIBox);
        lasers_1.sendLaserData(laserUIBox);
    });
});
/*store last parameters input in focus*/
scanParameteres_1.UIparameters.forEach(param => {
    param.addEventListener("click", () => {
        removeHighlithBoder();
        lastFocus = param;
        param.value = "";
        param.classList.add("highlighted");
        scanParameteres_1.sendParamChange(param);
    });
});
/*add touched num in last focus element*/
numpad_1.numPad.forEach((numBtn, i) => {
    numBtn.addEventListener("click", () => {
        if (lastFocus != null) {
            lastFocus.classList.add("highlighted");
            let lastFocusParamIndex = scanParameteres_1.UIparameters.indexOf(lastFocus);
            if (Number(scanParameteres_1.UIparameters[lastFocusParamIndex].value + i) > scanParameteres_1.limits[lastFocusParamIndex].max ||
                Number(scanParameteres_1.UIparameters[lastFocusParamIndex].value + i) < scanParameteres_1.limits[lastFocusParamIndex].min) {
                lastFocus.classList.add("limit");
                setTimeout(() => lastFocus.classList.remove("limit"), 600);
            }
            else {
                lastFocus.value += i;
                scanParameteres_1.sendParamChange(lastFocus);
            }
        }
    });
});
scanParameteres_1.UIparameters.forEach(param => param.addEventListener("change", () => alert("cambiato")));
//problem
/*add dot to last focus element when dot button pressed */
numpad_1.dotBtn.addEventListener("click", () => {
    if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
        lastFocus.classList.add("highlighted");
        lastFocus.value += ".";
        //  sendParamChange(lastFocus);
    }
});
/*delete number to last focus element when delete button pressed */
numpad_1.delBtn.addEventListener("click", () => {
    if (lastFocus != null) {
        lastFocus.classList.add("highlighted");
        lastFocus.value = lastFocus.value.slice(0, -1); /*remove last character */
        scanParameteres_1.sendParamChange(lastFocus);
    }
});
/*add dragable capabilities*/
let dragObj = new dragObj_1.DragObj(movObj_1.inspectArea, movObj_1.sampleArea);
let pinchObj = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
let xyMotor = new joystickObj_1.JoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
let zMotor = new joystickObj_1.JoystickObj(movObj_1.zThumb, movObj_1.zSlider);
movObj_1.zSensBtn.addEventListener("click", () => {
    movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
//setInterval(getCurrentState, 200);
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then(newState => {
        newState;
        scanParameteres_1.updateLimits(newState);
        lasers_1.updateUILasers(newState);
        scanParameteres_1.updateUIParameters(newState);
    });
}
function updateUIPads() { }
const source = new EventSource("/stream");
source.addEventListener("state-updated", (event) => {
    let newState = JSON.parse(event.data);
    scanParameteres_1.updateLimits(newState);
    lasers_1.updateUILasers(newState);
    scanParameteres_1.updateUIParameters(newState);
});

},{"./UIparts/lasers":1,"./UIparts/numpad":2,"./UIparts/scanParameteres":3,"./drag-pinch-joystick/dragObj":4,"./drag-pinch-joystick/joystickObj":5,"./drag-pinch-joystick/movObj":6,"./drag-pinch-joystick/pinchObj":7}]},{},[8]);
