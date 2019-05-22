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

},{"./movObj":3}],3:[function(require,module,exports){
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
        let areaStyle = window.getComputedStyle(this.area);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = areaStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        this._areaBorderSize = Number(regex.exec(str)[1]);
    }
    translateToUI(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}
exports.MovObj = MovObj;

},{}],4:[function(require,module,exports){
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

},{"./dragObj":2}],5:[function(require,module,exports){
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

},{"./movObj":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toFromAPI_1 = require("../toFromAPI");
class LaserUIRow {
    get isOn() {
        return this._isOn;
    }
    set isOn(value) {
        if (value)
            this.lightUp();
        else
            this.grayOut();
        this._isOn = value;
    }
    get waveLength() {
        return Number(this.waveLengthLabel.innerHTML.slice(0, -1).slice(0, -1));
    }
    get power() {
        return Number(this.powerLabel.innerHTML.slice(0, -1));
    }
    set power(value) {
        this._power = value;
        this.powerLabel.innerHTML = value.toString() + "%";
        this.slider.value = value.toString();
    }
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
    grayOut() {
        this.slider.disabled = true;
        this.box.classList.add("grayed-out");
        this.btn.classList.remove("laser-btn-on");
        this.btn.classList.add("laser-btn-off");
    }
    lightUp() {
        this.slider.disabled = false;
        this.box.classList.remove("grayed-out");
        this.btn.classList.remove("laser-btn-off");
        this.btn.classList.add("laser-btn-on");
    }
}
const laserOnOffBtns = document.querySelectorAll(".laser-on-off-btn");
const laserWaveLengths = document.querySelectorAll(".laser-type");
const laserSliders = document.querySelectorAll(".slider");
const laserPowers = document.querySelectorAll(".laser-power");
const laserRows = document.querySelectorAll(".slider-row");
exports.laserUIRows = [];
laserRows.forEach((laserRow, i) => {
    exports.laserUIRows.push(new LaserUIRow(laserRow, laserWaveLengths[i], laserSliders[i], laserOnOffBtns[i], laserPowers[i], true, i));
});
function updateUILasersFromLasers(lasers) {
    exports.laserUIRows.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= lasers.length)
            exports.laserUIRows[i].visible = false;
        else {
            exports.laserUIRows[i].powerLabel.innerHTML = lasers[i].power.value.toString() + "%";
            exports.laserUIRows[i].slider.value = lasers[i].power.value.toString();
            exports.laserUIRows[i].waveLengthLabel.innerHTML = lasers[i].waveLength.value.toString() + "nm";
            exports.laserUIRows[i].isOn = lasers[i].isOn.value;
        }
    });
}
exports.updateUILasersFromLasers = updateUILasersFromLasers;
function setUpLasers() {
    //adds event to slider box for slider movement and on/off button
    exports.laserUIRows.forEach(laserUIRow => {
        laserUIRow.slider.addEventListener("input", () => {
            let tempValue = laserUIRow.slider.value;
            laserUIRow.powerLabel.innerHTML = tempValue + "%";
        });
        laserUIRow.slider.addEventListener("touchend", () => {
            let tempValue = laserUIRow.slider.value;
            laserUIRow.powerLabel.innerHTML = tempValue + "%";
            toFromAPI_1.sendPut(`prismState/lasers/power?waveLength=${laserUIRow.waveLength}`, Number(laserUIRow.power));
        });
        laserUIRow.btn.addEventListener("mouseup", () => {
            laserUIRow.isOn = !laserUIRow.isOn;
            toFromAPI_1.sendPut(`prismState/lasers/isOn?waveLength=${laserUIRow.waveLength}`, laserUIRow.isOn);
        });
    });
}
exports.setUpLasers = setUpLasers;

},{"../toFromAPI":13}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toFromAPI_1 = require("../toFromAPI");
const modeBtns = document.querySelectorAll(".mode-btn");
function setUpModeBtns() {
    // mode btns events
    modeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("highlighted-button")) {
                btn.classList.remove("highlighted-button");
                toFromAPI_1.sendPut("prismState/mode", "stop");
            }
            else {
                modeBtns.forEach(btn => btn.classList.remove("highlighted-button"));
                btn.classList.add("highlighted-button");
                toFromAPI_1.sendPut("prismState/mode", btn.id.split("-")[0]);
            }
        });
    });
}
exports.setUpModeBtns = setUpModeBtns;
function updateModeBtns(newValue) {
    modeBtns.forEach(modeBtn => {
        modeBtn.classList.remove("highlighted-button");
        if (newValue != "stop")
            document.getElementById(`${newValue}-btn`).classList.add("highlighted-button");
    });
}
exports.updateModeBtns = updateModeBtns;

},{"../toFromAPI":13}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circJoystick_1 = require("./drag-pinch-joystick/circJoystick");
const sliderJoystickObj_1 = require("./drag-pinch-joystick/sliderJoystickObj");
const toFromAPI_1 = require("../toFromAPI");
const zThumb = document.querySelector("#z-thumb");
const zSlider = document.querySelector("#z-slider");
const joyPad = document.querySelector("#joystick-pad");
const joyThumb = document.querySelector("#joystick-thumb");
const zSensBtn = document.querySelector("#z-sens-btn");
exports.zSenses = ["0.1x", "0.5x", "1x"];
function setUpMotorsControls() {
    let xyMotor = new circJoystick_1.CircJoystickObj(joyThumb, joyPad);
    let intervalCheckerXY;
    xyMotor.element.addEventListener("touchstart", () => {
        intervalCheckerXY = setInterval(() => {
            if (xyMotor.mag > 0) {
                toFromAPI_1.sendPut("prismState/motors/x", (xyMotor.mag * Math.cos(xyMotor.arg)) / xyMotor.maxMag);
                toFromAPI_1.sendPut("prismState/motors/y", (xyMotor.mag * Math.sin(xyMotor.arg)) / xyMotor.maxMag);
            }
        }, 500);
    });
    xyMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerXY));
    //x motor slider
    let zMotor = new sliderJoystickObj_1.SliderJoystickObj(zThumb, zSlider);
    let intervalCheckerZ;
    zMotor.element.addEventListener("touchstart", () => {
        intervalCheckerZ = setInterval(() => {
            toFromAPI_1.sendPut("prismState/motors/z", Number(zMotor.sliderValue) * Number(zSensBtn.innerHTML.slice(0, -1)));
        }, 500);
    });
    zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));
    //change z joystick sensibility when touched
    zSensBtn.addEventListener("click", () => {
        zSensBtn.innerHTML = exports.zSenses[(exports.zSenses.indexOf(zSensBtn.innerHTML) + 1) % exports.zSenses.length];
    });
}
exports.setUpMotorsControls = setUpMotorsControls;

},{"../toFromAPI":13,"./drag-pinch-joystick/circJoystick":1,"./drag-pinch-joystick/sliderJoystickObj":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainUI_1 = require("../mainUI");
//import { limits } from "./limits";
const scanParameteres_1 = require("./scanParameteres");
exports.dotBtn = document.querySelector("#btnDot");
exports.delBtn = document.querySelector("#btnDel");
//export const numPad = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];
const tempNumPad = document.querySelectorAll(".num-btn");
//convert numpad list to array to make filtering possible
exports.numPad = [];
tempNumPad.forEach(btn => exports.numPad.push(btn));
function setUpNumPad() {
    exports.numPad.forEach(numBtn => {
        numBtn.addEventListener("click", () => {
            if (mainUI_1.lastFocus != null) {
                mainUI_1.lastFocus.classList.add("highlighted");
                scanParameteres_1.changeScanParam(mainUI_1.lastFocus.id, numPadClick(mainUI_1.lastFocus, Number(numBtn.innerHTML))); // Number(lastFocus.value) * 10 + Number(numBtn.innerHTML));
            }
        });
    });
    /*Numpad events */
    //add dot to last focus element when dot button pressed
    exports.dotBtn.addEventListener("click", () => {
        if (mainUI_1.lastFocus !== null && mainUI_1.lastFocus.value.slice(-1) !== "." && mainUI_1.lastFocus.value.length != 0) {
            mainUI_1.lastFocus.classList.add("highlighted");
            mainUI_1.lastFocus.value += ".";
        }
    });
    //delete number to last focus element when delete button pressed
    exports.delBtn.addEventListener("click", () => {
        if (mainUI_1.lastFocus != null) {
            mainUI_1.lastFocus.classList.add("highlighted");
            scanParameteres_1.changeScanParam(mainUI_1.lastFocus.id, mainUI_1.lastFocus.value.slice(0, -1));
        }
    });
}
exports.setUpNumPad = setUpNumPad;
function numPadClick(el, input) {
    if (el.value.includes("."))
        return Number(el.value + `${input}`);
    else
        return Number(el.value) * 10 + input;
}

},{"../mainUI":12,"./scanParameteres":11}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinchObj_1 = require("./drag-pinch-joystick/pinchObj");
const scanParameteres_1 = require("./scanParameteres");
const toFromAPI_1 = require("../toFromAPI");
const inspectArea = document.querySelector("#scan-area");
const sampleArea = document.querySelector("#total-area");
exports.scanArea = new pinchObj_1.PinchObj(inspectArea, sampleArea, 20);
function setUpLookSurface() {
    //update own UI parameters
    exports.scanArea.area.addEventListener("touchmove", () => {
        scanParameteres_1.changeScanParam(scanParameteres_1.offsetX.id, (exports.scanArea.leftRelPos * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetX.id).max) / exports.scanArea.areaWidth, false);
        scanParameteres_1.changeScanParam(scanParameteres_1.offsetY.id, (exports.scanArea.topRelPos * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetY.id).max) / exports.scanArea.areaHeight, false);
        scanParameteres_1.changeScanParam(scanParameteres_1.rangeX.id, (exports.scanArea.elWidth * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeX.id).max) / exports.scanArea.areaWidth, false);
        scanParameteres_1.changeScanParam(scanParameteres_1.rangeY.id, (exports.scanArea.elHeight * scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeY.id).max) / exports.scanArea.areaHeight, false);
    });
    window.addEventListener("resize", adatapLookSurface);
    //send parameter change when untouched
    exports.scanArea.area.addEventListener("touchend", () => {
        toFromAPI_1.sendPut("prismState/scanParams/offset/x", Number(scanParameteres_1.offsetX.value));
        toFromAPI_1.sendPut("prismState/scanParams/offset/y", Number(scanParameteres_1.offsetY.value));
        toFromAPI_1.sendPut("prismState/scanParams/range/x", Number(scanParameteres_1.rangeX.value));
        toFromAPI_1.sendPut("prismState/scanParams/range/y", Number(scanParameteres_1.rangeY.value));
    });
}
exports.setUpLookSurface = setUpLookSurface;
function adatapLookSurface() {
    exports.scanArea.leftRelPos = (Number(scanParameteres_1.offsetX.value) * exports.scanArea.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetX.id).max;
    exports.scanArea.topRelPos = (Number(scanParameteres_1.offsetY.value) * exports.scanArea.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.offsetY.id).max;
    exports.scanArea.elWidth = (Number(scanParameteres_1.rangeX.value) * exports.scanArea.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeX.id).max;
    exports.scanArea.elHeight = (Number(scanParameteres_1.rangeY.value) * exports.scanArea.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParameteres_1.rangeY.id).max;
}
exports.adatapLookSurface = adatapLookSurface;

},{"../toFromAPI":13,"./drag-pinch-joystick/pinchObj":4,"./scanParameteres":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toFromAPI_1 = require("../toFromAPI");
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
    check(value) {
        return value <= this.max && value >= this.min;
    }
}
exports.offsetX = document.querySelector("#scanParams-offset-x");
exports.offsetY = document.querySelector("#scanParams-offset-y");
const pixelNumberX = document.querySelector("#scanParams-pixelNumber-x");
const pixelNumberY = document.querySelector("#scanParams-pixelNumber-y");
const pixelNumberZ = document.querySelector("#scanParams-pixelNumber-z");
const pixelSizeX = document.querySelector("#scanParams-pixelSize-x");
const pixelSizeY = document.querySelector("#scanParams-pixelSize-y");
const pixelSizeZ = document.querySelector("#scanParams-pixelSize-z");
exports.rangeX = document.querySelector("#scanParams-range-x");
exports.rangeY = document.querySelector("#scanParams-range-y");
const rangeZ = document.querySelector("#scanParams-range-z");
const dwellTime = document.querySelector("#scanParams-dwellTime");
const totalTime = document.querySelector("#scanParams-totalTime");
const tempUIparams = document.querySelectorAll(".param-input");
exports.UIparameters = [];
//remove grayed out elemts from tempUIparameters
tempUIparams.forEach(param => {
    if (!param.classList.contains("grayed-out")) {
        exports.UIparameters.push(param);
    }
});
//initialize limit array
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
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
function getXYZproperties(scanParams) {
    let props = Object.keys(scanParams);
    return props.filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    });
}
exports.getXYZproperties = getXYZproperties;
function updateUIParameters(scanParams) {
    getXYZproperties(scanParams).forEach(prop => {
        changeScanParam(scanParams[prop].x.id, scanParams[prop].x.value, false);
        changeScanParam(scanParams[prop].y.id, scanParams[prop].y.value, false);
        changeScanParam(scanParams[prop].z.id, scanParams[prop].z.value, false);
    });
    document.getElementById("scanParams-dwellTime").value = scanParams.dwellTime.value.toString();
}
exports.updateUIParameters = updateUIParameters;
function changeScanParam(id, value, sendPUT = true) {
    let el = document.querySelector(`#${id}`);
    if (exports.limits.find(limit => limit.id == id).check(Number(value))) {
        el.value = value.toString();
        if (Number(exports.offsetX.value) + Number(exports.rangeX.value) > exports.limits.find(limit => limit.id == exports.offsetX.id).max) {
            exports.rangeX.value = (exports.limits.find(limit => limit.id == exports.offsetX.id).max - Number(exports.offsetX.value)).toString();
            if (sendPUT)
                toFromAPI_1.sendPut(`prismState/scanParams/range/x`, Number(exports.rangeX.value));
        }
        if (Number(exports.offsetY.value) + Number(exports.rangeY.value) > exports.limits.find(limit => limit.id == exports.offsetY.id).max) {
            exports.rangeY.value = (exports.limits.find(limit => limit.id == exports.offsetY.id).max - Number(exports.offsetY.value)).toString();
            if (sendPUT)
                toFromAPI_1.sendPut(`prismState/scanParams/range/y`, Number(exports.rangeY.value));
        }
        if (sendPUT)
            toFromAPI_1.sendPut(`prismState/${id.replace("-", "/").replace("-", "/")}`, Number(el.value));
        pixelSizeX.value = (Number(exports.rangeX.value) / Number(pixelNumberX.value)).toString();
        pixelSizeY.value = (Number(exports.rangeY.value) / Number(pixelNumberY.value)).toString();
        pixelSizeZ.value = (Number(rangeZ.value) / Number(pixelNumberZ.value)).toString();
        totalTime.value = (Number(dwellTime.value) *
            (Number(pixelNumberX.value) + Number(pixelNumberY.value) + Number(pixelNumberZ.value))).toString();
    }
    else {
        let tempElLimit = el;
        tempElLimit.classList.add("limit");
        setTimeout(() => tempElLimit.classList.remove("limit"), 600);
    }
}
exports.changeScanParam = changeScanParam;
//limit properties
exports.limits = [];
exports.UIparameters.forEach(param => exports.limits.push(new Limit(param.id)));
function updateLimits(scanParams) {
    getXYZproperties(scanParams).forEach(prop => {
        //updates limit for each scanParam that as xyz
        exports.limits.find(limit => limit.id == scanParams[prop].x.id).max = scanParams[prop].x.max;
        exports.limits.find(limit => limit.id == scanParams[prop].x.id).min = scanParams[prop].x.min;
        exports.limits.find(limit => limit.id == scanParams[prop].y.id).max = scanParams[prop].y.max;
        exports.limits.find(limit => limit.id == scanParams[prop].y.id).min = scanParams[prop].y.min;
        exports.limits.find(limit => limit.id == scanParams[prop].z.id).max = scanParams[prop].z.max;
        exports.limits.find(limit => limit.id == scanParams[prop].z.id).min = scanParams[prop].z.min;
    });
    exports.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
exports.updateLimits = updateLimits;

},{"../toFromAPI":13}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*numpad element*/
const scanParameteres_1 = require("./UIparts/scanParameteres");
const toFromAPI_1 = require("./toFromAPI");
const mode_1 = require("./UIparts/mode");
const motorsControls_1 = require("./UIparts/motorsControls");
const scanArea_1 = require("./UIparts/scanArea");
const lasers_1 = require("./UIparts/lasers");
const numpad_1 = require("./UIparts/numpad");
/*get microscope state on UI start-up */
toFromAPI_1.getCurrentMicroState();
toFromAPI_1.setUpUpdater();
mode_1.setUpModeBtns();
lasers_1.setUpLasers();
numpad_1.setUpNumPad();
scanArea_1.setUpLookSurface();
motorsControls_1.setUpMotorsControls();
//last item in focus
exports.lastFocus = undefined;
//remove highlight border only when touching something excluding numpad and selectred parameter
document.body.addEventListener("click", function (e) {
    if (exports.lastFocus != null) {
        if (numpad_1.numPad.filter(numBtn => numBtn === e.target).length == 0) {
            if (e.target !== numpad_1.delBtn && e.target !== numpad_1.dotBtn)
                if (scanParameteres_1.UIparameters.filter(param => param === e.target).length == 0) {
                    removeHighlithBoder();
                    toFromAPI_1.sendPut(`prismState/${exports.lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(exports.lastFocus.value));
                    console.log("here");
                    exports.lastFocus = null;
                }
        }
    }
});
//setting up scanning parameters
//store last parameters input in focus
scanParameteres_1.UIparameters.forEach(param => {
    param.addEventListener("touchstart", () => {
        removeHighlithBoder();
        exports.lastFocus = param;
        param.value = "";
        param.classList.add("highlighted");
    });
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

},{"./UIparts/lasers":6,"./UIparts/mode":7,"./UIparts/motorsControls":8,"./UIparts/numpad":9,"./UIparts/scanArea":10,"./UIparts/scanParameteres":11,"./toFromAPI":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lasers_1 = require("./UIparts/lasers");
const scanParameteres_1 = require("./UIparts/scanParameteres");
const scanArea_1 = require("./UIparts/scanArea");
const mode_1 = require("./UIparts/mode");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("update", (event) => {
        let resource = JSON.parse(event.data).resource;
        let idEls = resource.id.split("-");
        switch (idEls[0]) {
            case "mode":
                mode_1.updateModeBtns(resource.value);
                break;
            case "scanParams":
                scanParameteres_1.changeScanParam(resource.id, resource.value, false);
                scanArea_1.adatapLookSurface();
                //(document.getElementById(resource.id) as HTMLInputElement).value = resource.value.toString();
                break;
            case "laser":
                let targetLaserRow = lasers_1.laserUIRows.find(laserRow => laserRow.waveLength == Number(idEls[1]));
                switch (idEls[3]) {
                    case "isOn":
                        targetLaserRow.isOn = resource.value;
                        break;
                    case "power":
                        targetLaserRow.power = resource.value;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });
}
exports.setUpUpdater = setUpUpdater;
function sendPut(resource, newValue) {
    fetch(`/${resource}`, {
        method: "PUT",
        body: JSON.stringify({ newValue }),
        headers: {
            "Content-type": "application/json"
        }
    });
}
exports.sendPut = sendPut;
function getCurrentMicroState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then((newState) => {
        scanParameteres_1.updateLimits(newState.scanParams);
        lasers_1.updateUILasersFromLasers(newState.lasers);
        scanParameteres_1.updateUIParameters(newState.scanParams);
        scanArea_1.adatapLookSurface();
    });
}
exports.getCurrentMicroState = getCurrentMicroState;

},{"./UIparts/lasers":6,"./UIparts/mode":7,"./UIparts/scanArea":10,"./UIparts/scanParameteres":11}]},{},[12]);
