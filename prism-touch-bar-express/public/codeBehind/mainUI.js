(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./dragObj":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movObj_1 = require("./movObj");
class DragObj extends movObj_1.MovObj {
    constructor(element, area) {
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
        this.area.addEventListener("mousedown", this.dragStart);
        this.area.addEventListener("touchstart", this.dragStart);
        this.area.addEventListener("mousemove", this.drag);
        this.area.addEventListener("touchmove", this.drag);
        this.area.addEventListener("mouseup", this.dragEnd);
        this.area.addEventListener("touchend", this.dragEnd);
    }
}
exports.DragObj = DragObj;

},{"./movObj":4}],3:[function(require,module,exports){
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
    setCenter() {
        this.centerX = this.area.getBoundingClientRect().width / 2 - this.element.getBoundingClientRect().width / 2 - this.areaBorderSize;
        this.centerY = this.area.getBoundingClientRect().height / 2 - this.element.getBoundingClientRect().height / 2 - this.areaBorderSize;
    }
    moveToCenter() {
        this.topRelPos = this.centerY;
        this.leftRelPos = this.centerX;
    }
}
exports.SliderJoystickObj = SliderJoystickObj;

},{"./movObj":4}],4:[function(require,module,exports){
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
        this.updateInfos();
        window.addEventListener("resize", () => this.updateInfos());
    }
    updateInfos() {
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
        let elStyle = window.getComputedStyle(this.area);
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dragObj_1 = require("./dragObj");
class PinchObj extends dragObj_1.DragObj {
    constructor(element, area, elMinDim) {
        super(element, area);
        this.pinchStart = (e) => {
            if (e.touches.length === 2) {
                if ((e.touches[0].target === this.area && e.touches[1].target === this.area) || e.touches) {
                    if (this.touchingOnlyRightPoints(e, this.element, this.area)) {
                        this.dragActive = false;
                        this.pincActive = true;
                        this.initialPinchDistance = Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2));
                        this.areaMaxDim = Math.min(this.area.getBoundingClientRect().width - 2 * this.areaBorderSize, this.area.getBoundingClientRect().height - 2 * this.areaBorderSize);
                    }
                }
            }
        };
        this.pinch = (e) => {
            if (this.pincActive) {
                e.preventDefault();
                if (e.touches.length === 2) {
                    this.pinchFactor =
                        Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)) /
                            this.initialPinchDistance;
                    //limitPinchFactor(this.pinchFactor);
                    this.pinchFactor = Math.pow(this.pinchFactor, 1 / 12);
                    let aspectRatio = this.elWidth / this.elHeight;
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
                    if (this.pinchFactor > 1) {
                        if (this.leftRelPos + newWidth + 2 * this.areaBorderSize > this.areaWidth) {
                            newWidth = this.areaWidth - this.leftRelPos;
                            newHeight = newWidth / aspectRatio;
                        }
                        if (this.topRelPos + newHeight + 2 * this.areaBorderSize > this.areaHeight) {
                            newHeight = this.areaHeight - this.topRelPos;
                            newWidth = newHeight * aspectRatio;
                        }
                    }
                    let newLeftPos = this.leftRelPos - (newWidth - this.elWidth) / 2;
                    let newTopPos = this.topRelPos - (newHeight - this.elHeight) / 2;
                    if (newLeftPos > 0 && newTopPos > 0) {
                        this.leftRelPos = newLeftPos;
                        this.topRelPos = newTopPos;
                    }
                    this.elWidth = newWidth;
                    this.elHeight = newHeight;
                }
            }
        };
        this.pinchEnd = () => {
            this.pincActive = false;
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

},{"./dragObj":2}],6:[function(require,module,exports){
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
function updateUILasersFromState(newState) {
    exports.laserUIBoxes.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= newState.lasers.length)
            exports.laserUIBoxes[i].visible = false;
        else {
            exports.laserUIBoxes[i].powerLabel.innerHTML = newState.lasers[i].power.toString() + "%";
            exports.laserUIBoxes[i].slider.value = newState.lasers[i].power.toString();
            exports.laserUIBoxes[i].waveLengthLabel.innerHTML = newState.lasers[i].waveLength.toString() + "nm";
            exports.laserUIBoxes[i].isOn = newState.lasers[i].isOn;
            if (newState.lasers[i].isOn)
                lightUpLaserBox(exports.laserUIBoxes[i]);
            else
                grayOutLaserBox(exports.laserUIBoxes[i]);
        }
    });
}
exports.updateUILasersFromState = updateUILasersFromState;
function updateUILasersFromLasers(lasers) {
    exports.laserUIBoxes.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= lasers.length)
            exports.laserUIBoxes[i].visible = false;
        else {
            exports.laserUIBoxes[i].powerLabel.innerHTML = lasers[i].power.toString() + "%";
            exports.laserUIBoxes[i].slider.value = lasers[i].power.toString();
            exports.laserUIBoxes[i].waveLengthLabel.innerHTML = lasers[i].waveLength.toString() + "nm";
            exports.laserUIBoxes[i].isOn = lasers[i].isOn;
            if (lasers[i].isOn)
                lightUpLaserBox(exports.laserUIBoxes[i]);
            else
                grayOutLaserBox(exports.laserUIBoxes[i]);
        }
    });
}
exports.updateUILasersFromLasers = updateUILasersFromLasers;
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
    }).then(res => res.json());
}
exports.sendLaserData = sendLaserData;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
function sendParamChangeSingle(resource, newValue) {
    fetch(`/prismState/scanParams/${resource}`, {
        method: "PUT",
        body: JSON.stringify({ newValue }),
        headers: {
            "Content-Type": "application/json"
        }
    });
}
exports.sendParamChangeSingle = sendParamChangeSingle;
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

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanParameteres_1 = require("./UIparts/scanParameteres");
const lasers_1 = require("./UIparts/lasers");
const mainUI_1 = require("./mainUI");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("offset-x-updated", (event) => {
        scanParameteres_1.UIparameters[0].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.leftRelPos = (Number(scanParameteres_1.UIparameters[0].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
    });
    source.addEventListener("offset-y-updated", (event) => {
        scanParameteres_1.UIparameters[1].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.topRelPos = (Number(scanParameteres_1.UIparameters[1].value) * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[1].max;
    });
    source.addEventListener("offset-z-updated", (event) => {
        scanParameteres_1.UIparameters[2].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-x-updated", (event) => {
        scanParameteres_1.UIparameters[3].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-y-updated", (event) => {
        scanParameteres_1.UIparameters[4].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-z-updated", (event) => {
        scanParameteres_1.UIparameters[5].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("range-x-updated", (event) => {
        scanParameteres_1.UIparameters[6].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.elWidth = (Number(scanParameteres_1.UIparameters[6].value) * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[6].max;
    });
    source.addEventListener("range-y-updated", (event) => {
        scanParameteres_1.UIparameters[7].value = JSON.parse(event.data).newValue;
        mainUI_1.lookSurface.elHeight = (Number(scanParameteres_1.UIparameters[7].value) * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[7].max;
    });
    source.addEventListener("range-z-updated", (event) => {
        scanParameteres_1.UIparameters[8].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("dwellTime-updated", (event) => {
        scanParameteres_1.UIparameters[9].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("limits-updated", (event) => {
        let newState = JSON.parse(event.data);
        scanParameteres_1.updateLimits(newState);
        updateUIPads(newState);
    });
    source.addEventListener("lasers-updated", (event) => {
        lasers_1.updateUILasersFromLasers(JSON.parse(event.data));
    });
    source.addEventListener("mode-updated", (event) => {
        mainUI_1.updateMode(JSON.parse(event.data).mode);
    });
}
exports.setUpUpdater = setUpUpdater;
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then(newState => {
        newState;
        scanParameteres_1.updateLimits(newState);
        lasers_1.updateUILasersFromState(newState);
        scanParameteres_1.updateUIParameters(newState);
        updateUIPads(newState);
    });
}
exports.getCurrentState = getCurrentState;
function updateUIPads(newState) {
    mainUI_1.lookSurface.leftRelPos = (newState.scanParams.offset.x.current * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[0].max;
    mainUI_1.lookSurface.topRelPos = (newState.scanParams.offset.y.current * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[1].max;
    mainUI_1.lookSurface.elWidth = (newState.scanParams.range.x.current * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits[6].max;
    mainUI_1.lookSurface.elHeight = (newState.scanParams.range.y.current * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits[7].max;
}
function sendMode(newMode) {
    fetch("/prismState/mode", {
        method: "PUT",
        body: JSON.stringify({ newMode }),
        headers: {
            "Content-type": "application/json"
        }
    });
}
exports.sendMode = sendMode;

},{"./UIparts/lasers":6,"./UIparts/scanParameteres":8,"./mainUI":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*laser elements*/
const lasers_1 = require("./UIparts/lasers");
/*numpad element*/
const numpad_1 = require("./UIparts/numpad");
/*parameters elements and methods*/
const scanParameteres_1 = require("./UIparts/scanParameteres");
/*UI pads,joysticks objects */
const movObj_1 = require("./UIparts/drag-pinch-joystick/movObj");
/*joystick capabilties*/
const joystickObj_1 = require("./UIparts/drag-pinch-joystick/joystickObj");
/*pinch class*/
const pinchObj_1 = require("./UIparts/drag-pinch-joystick/pinchObj");
/*circular joystick class*/
const circJoystick_1 = require("./UIparts/drag-pinch-joystick/circJoystick");
/*UI SSE updater*/
const UIupdater_1 = require("./UIupdater");
/*get microscope state on UI start-up */
UIupdater_1.getCurrentState();
UIupdater_1.setUpUpdater();
/*last item in focus*/
let lastFocus = undefined;
/*store last parameters input in focus*/
scanParameteres_1.UIparameters.forEach(param => {
    param.addEventListener("touchstart", () => {
        removeHighlithBoder();
        lastFocus = param;
        param.value = "";
        param.classList.add("highlighted");
        //sendParamChange(param);
    });
});
/*remove highlight border only when touching something excluding numpad and selectred parameter*/
document.body.addEventListener("click", function (e) {
    if (lastFocus != null) {
        if (numpad_1.numPad.filter(numBtn => numBtn === e.target).length == 0) {
            if (e.target !== numpad_1.delBtn && e.target !== numpad_1.dotBtn)
                if (scanParameteres_1.UIparameters.filter(param => param === e.target).length == 0) {
                    removeHighlithBoder();
                    scanParameteres_1.sendParamChange(lastFocus);
                    lastFocus = null;
                }
        }
    }
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
let currentMode;
function updateMode(newMode) {
    currentMode = newMode;
    actionBtns.forEach(btn => btn.classList.remove("highlighted-button"));
    let higlightBtn;
    switch (currentMode) {
        case "live":
            higlightBtn = liveBtn;
            break;
        case "capture":
            higlightBtn = captureBtn;
            break;
        case "stack":
            higlightBtn = stackBtn;
            break;
        default:
            higlightBtn = null;
            break;
    }
    if (higlightBtn != null)
        higlightBtn.classList.add("highlighted-button");
}
exports.updateMode = updateMode;
/*mode btns  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
const actionBtns = [liveBtn, captureBtn, stackBtn];
liveBtn.addEventListener("click", () => {
    if (currentMode === "live") {
        liveBtn.classList.remove("highlighted-button");
        UIupdater_1.sendMode("stand-by");
    }
    else {
        liveBtn.classList.add("highlighted-button");
        UIupdater_1.sendMode("live");
    }
});
captureBtn.addEventListener("click", () => {
    if (currentMode === "capture") {
        captureBtn.classList.remove("highlighted-button");
        UIupdater_1.sendMode("stand-by");
    }
    else {
        captureBtn.classList.add("highlighted-button");
        UIupdater_1.sendMode("capture");
    }
});
stackBtn.addEventListener("click", () => {
    if (currentMode === "stack") {
        stackBtn.classList.remove("highlighted-button");
        UIupdater_1.sendMode("stand-by");
    }
    else {
        stackBtn.classList.add("highlighted-button");
        UIupdater_1.sendMode("stack");
    }
});
/*adds event to slider box for slider movement and on/off button*/
lasers_1.laserUIBoxes.forEach(laserUIBox => {
    laserUIBox.slider.oninput = () => {
        let tempValue = laserUIBox.slider.value;
        laserUIBox.powerLabel.innerHTML = tempValue + "%";
        lasers_1.sendLaserData(laserUIBox);
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
/*add dot to last focus element when dot button pressed */
numpad_1.dotBtn.addEventListener("click", () => {
    if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
        lastFocus.classList.add("highlighted");
        lastFocus.value += ".";
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
/*pads initializations*/
exports.lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
/*update own UI parameters*/
exports.lookSurface.area.addEventListener("touchmove", () => {
    scanParameteres_1.UIparameters[0].value = String((exports.lookSurface.leftRelPos * scanParameteres_1.limits[0].max) / exports.lookSurface.areaWidth);
    scanParameteres_1.UIparameters[1].value = String((exports.lookSurface.topRelPos * scanParameteres_1.limits[1].max) / exports.lookSurface.areaHeight);
    scanParameteres_1.UIparameters[6].value = String((exports.lookSurface.elWidth * scanParameteres_1.limits[6].max) / exports.lookSurface.areaWidth);
    scanParameteres_1.UIparameters[7].value = String((exports.lookSurface.elHeight * scanParameteres_1.limits[7].max) / exports.lookSurface.areaHeight);
});
/*send parameter change when untouched*/
exports.lookSurface.area.addEventListener("touchend", () => {
    scanParameteres_1.sendParamChangeSingle("offset/x", Number(scanParameteres_1.UIparameters[0].value));
    scanParameteres_1.sendParamChangeSingle("offset/y", Number(scanParameteres_1.UIparameters[1].value));
    scanParameteres_1.sendParamChangeSingle("range/x", Number(scanParameteres_1.UIparameters[6].value));
    scanParameteres_1.sendParamChangeSingle("range/y", Number(scanParameteres_1.UIparameters[7].value));
});
/*joystick initializations*/
let zMotor = new joystickObj_1.SliderJoystickObj(movObj_1.zThumb, movObj_1.zSlider);
let xyMotor = new circJoystick_1.CircJoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
/*change z joystick sensibility when touched */
movObj_1.zSensBtn.addEventListener("click", () => {
    movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
});

},{"./UIparts/drag-pinch-joystick/circJoystick":1,"./UIparts/drag-pinch-joystick/joystickObj":3,"./UIparts/drag-pinch-joystick/movObj":4,"./UIparts/drag-pinch-joystick/pinchObj":5,"./UIparts/lasers":6,"./UIparts/numpad":7,"./UIparts/scanParameteres":8,"./UIupdater":9}]},{},[10]);
