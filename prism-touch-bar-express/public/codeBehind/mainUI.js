(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movInfo_1 = require("./movInfo");
const movInfo_2 = require("./movInfo");
const movInfo_3 = require("./movInfo");
class DragInfo extends movInfo_1.MovInfo {
    constructor(element, area) {
        super(element, area);
    }
}
exports.dragInfos = [new DragInfo(movInfo_3.inspectArea, movInfo_2.sampleArea)];
function dragStart(e) {
    exports.dragInfos.forEach((info) => {
        if (e.target === info.element) {
            info.active = true;
            //set start position
            if (e.type === "touchstart") {
                let eTouch = e;
                if ((eTouch).touches.length === 1) {
                    info.initialX = (eTouch).touches[0].clientX - info.relPos.left;
                    info.initialY = (eTouch).touches[0].clientY - info.relPos.top;
                }
            }
            else {
                info.initialX = e.clientX - info.relPos.left;
                info.initialY = e.clientY - info.relPos.top;
            }
        }
    });
}
exports.dragStart = dragStart;
function drag(e) {
    exports.dragInfos.forEach((info) => {
        //if user is touching
        if (info.active) {
            e.preventDefault();
            let currentX;
            let currentY;
            //set offset position relative to top-left of draggable area
            if (e.type === "touchmove") {
                let eTouch = e;
                if ((eTouch).touches.length === 1) {
                    currentX = (eTouch).touches[0].clientX - info.initialX;
                    currentY = (eTouch).touches[0].clientY - info.initialY;
                }
            }
            else {
                currentX = e.clientX - info.initialX;
                currentY = e.clientY - info.initialY;
            }
            //stops movable element from going outside the draggable area when dragging it
            let areaWidth = info.area.getBoundingClientRect().width;
            let dragElWidth = info.element.getBoundingClientRect().width;
            let areaHeight = info.area.getBoundingClientRect().height;
            let dragElHeight = info.element.getBoundingClientRect().height;
            let dragAreaBorderSize = movInfo_1.getBorderSize(info.area);
            if (currentX + dragElWidth + 2 * dragAreaBorderSize > areaWidth)
                currentX = areaWidth - dragElWidth - 2 * dragAreaBorderSize;
            if (currentX < 0)
                currentX = 0;
            if (currentY + dragElHeight + 2 * dragAreaBorderSize > areaHeight)
                currentY = areaHeight - dragElHeight - 2 * dragAreaBorderSize;
            if (currentY < 0)
                currentY = 0;
            info.setRelPosLeft(currentX);
            info.setRelPosTop(currentY);
            //translateToUI(currentX, currentY, info.element);
        }
    });
}
exports.drag = drag;
;
function dragEnd(e) {
    exports.dragInfos.forEach((info) => info.active = false);
}
exports.dragEnd = dragEnd;

},{"./movInfo":3}],2:[function(require,module,exports){
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

},{"./movInfo":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RelPosInfo {
    constructor(top, right, bottom, left) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
    }
}
class MovInfo {
    constructor(element, area) {
        this.element = element;
        this.area = area;
        this.active = false;
        this.getBorderSize();
        this.getRelPos();
    }
    get borderSize() {
        this.getBorderSize();
        return this._borderSize;
    }
    get relPos() {
        this.getRelPos();
        return this._relPos;
    }
    setRelPosTop(top) {
        this._relPos.top = top;
        translateToUI(this._relPos.left, top, this.element);
    }
    setRelPosLeft(left) {
        this._relPos.left = left;
        translateToUI(left, this._relPos.top, this.element);
    }
    getBorderSize() {
        let elStyle = window.getComputedStyle(this.element);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        this._borderSize = Number(regex.exec(str)[1]);
    }
    getRelPos() {
        this._relPos = new RelPosInfo(this.element.getBoundingClientRect().top -
            this.element.parentElement.getBoundingClientRect().top -
            getBorderSize(this.element) -
            1, this.element.getBoundingClientRect().right -
            this.element.parentElement.getBoundingClientRect().right -
            getBorderSize(this.element) -
            1, this.element.getBoundingClientRect().bottom -
            this.element.parentElement.getBoundingClientRect().bottom -
            getBorderSize(this.element) -
            1, this.element.getBoundingClientRect().left -
            this.element.parentElement.getBoundingClientRect().left -
            getBorderSize(this.element) -
            1);
    }
}
exports.MovInfo = MovInfo;
exports.inspectArea = document.querySelector("#inspect-area-0");
exports.sampleArea = document.querySelector("#sample-area");
exports.joyPad = document.querySelector("#joystick-pad");
exports.joyThumb = document.querySelector("#joystick-thumb");
exports.zThumb = document.querySelector("#z-thumb");
exports.zSlider = document.querySelector("#z-slider");
exports.zSensBtn = document.querySelector("#z-sens-btn");
exports.zSenses = ["0.1x", "0.5x", "1x"];
function getBorderSize(el) {
    let elStyle = window.getComputedStyle(el);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = elStyle.getPropertyValue("border"); //gets rid of "px" in height CSS property
    return Number(regex.exec(str)[1]);
}
exports.getBorderSize = getBorderSize;
function getRelPos(el) {
    return new RelPosInfo(el.getBoundingClientRect().top - el.parentElement.getBoundingClientRect().top - getBorderSize(el) - 1, el.getBoundingClientRect().right - el.parentElement.getBoundingClientRect().right - getBorderSize(el) - 1, el.getBoundingClientRect().bottom - el.parentElement.getBoundingClientRect().bottom - getBorderSize(el) - 1, el.getBoundingClientRect().left - el.parentElement.getBoundingClientRect().left - getBorderSize(el) - 1);
}
exports.getRelPos = getRelPos;
function translateToUI(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
exports.translateToUI = translateToUI;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movInfo_1 = require("./movInfo");
const movInfo_2 = require("./movInfo");
const movInfo_3 = require("./movInfo");
class PinchInfo {
    constructor(pinchElement, pinchArea, elMinDim) {
        this.pinchELement = pinchElement;
        this.pinchArea = pinchArea;
        this.pinchActive = false;
        this.elMinDim = elMinDim;
    }
}
exports.pinchInfos = [new PinchInfo(movInfo_3.inspectArea, movInfo_2.sampleArea, 40)];
function pinchStart(e) {
    exports.pinchInfos.forEach(info => {
        if (e.touches.length === 2) {
            if (e.touches[0].target === info.pinchArea && e.touches[1].target === info.pinchArea ||
                e.touches) {
                if (touchingOnlyRightPoints(e, info.pinchELement, info.pinchArea)) {
                    info.pinchActive = true;
                    info.initialPinchDistance = Math.sqrt(Math.pow((e).touches[0].clientX - (e).touches[1].clientX, 2)
                        + Math.pow((e).touches[0].clientY - (e).touches[1].clientY, 2));
                    info.areaMaxDim = Math.min(info.pinchArea.getBoundingClientRect().width - 2 * movInfo_1.getBorderSize(info.pinchArea), info.pinchArea.getBoundingClientRect().height - 2 * movInfo_1.getBorderSize(info.pinchArea));
                }
            }
        }
    });
}
exports.pinchStart = pinchStart;
function pinch(e) {
    exports.pinchInfos.forEach((info, index) => {
        if (info.pinchActive) {
            e.preventDefault();
            if (e.touches.length === 2) {
                info.pinchFactor = Math.sqrt(Math.pow((e).touches[0].clientX - (e).touches[1].clientX, 2)
                    + Math.pow((e).touches[0].clientY - (e).touches[1].clientY, 2))
                    / info.initialPinchDistance;
                //limitPinchFactor(info.pinchFactor);
                info.pinchFactor = Math.pow(info.pinchFactor, 1 / 8);
                let newWidth = info.pinchELement.getBoundingClientRect().width * info.pinchFactor;
                let newHeight = info.pinchELement.getBoundingClientRect().height * info.pinchFactor;
                if (newWidth > info.areaMaxDim)
                    newWidth = info.areaMaxDim;
                if (newHeight > info.areaMaxDim)
                    newHeight = info.areaMaxDim;
                if (newWidth < info.elMinDim)
                    newWidth = info.elMinDim;
                if (newHeight < info.elMinDim)
                    newHeight = info.elMinDim;
                info.pinchELement.style.width = String(newWidth) + "px";
                info.pinchELement.style.height = String(newHeight) + "px";
            }
        }
    });
}
exports.pinch = pinch;
function pinchEnd() {
    exports.pinchInfos.forEach(info => { info.pinchActive = false; });
}
exports.pinchEnd = pinchEnd;
//Checks if user is only touching the element to pinch and/or the area where to pinch it
function touchingOnlyRightPoints(e, element, area) {
    return e.touches[0].target === area && e.touches[1].target === area ||
        e.touches[0].target === element && e.touches[1].target === element ||
        e.touches[0].target === element && e.touches[1].target === area ||
        e.touches[0].target === area && e.touches[1].target === element;
}

},{"./movInfo":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Motors {
}
exports.Motors = Motors;
class State {
    constructor() {
        this.scanParams = new ScanParams();
        this.lasers = [new Laser(), new Laser(), new Laser(), new Laser()];
    }
}
exports.State = State;
class Laser {
    constructor() {
        this.power = null;
        this.waveLength = null;
    }
}
class ScanParams {
    constructor() {
        this.offset = new XYZ();
        this.pixelNumber = new XYZ();
        this.range = new XYZ();
        this.dwellTime = null;
    }
}
//for XYZ parameters
class XYZ {
    constructor() {
        this.x = new CurrMaxMin();
        this.y = new CurrMaxMin();
        this.z = new CurrMaxMin();
    }
}
//Current Value, Max Value, Min Value
class CurrMaxMin {
    get current() {
        return this._current;
    }
    set current(value) {
        if (value > this.max)
            console.log("value greater than max");
        //throw new Error(        "bella"`Current Value:${this._current} exceeded Max value:${this.max}`      );
        else if (value < this.min)
            console.log("value lower than min");
        //throw new Error(        "bella"`Current Value:${this._current} exceeded Min value:${this.min}`      );
        this._current = value;
    }
    constructor() {
        this._current = null;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.POSITIVE_INFINITY;
    }
}

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const laserWaveLengt1 = document.querySelector("#laser-type-1");
const laserWaveLength2 = document.querySelector("#laser-type-2");
const laserWaveLength3 = document.querySelector("#laser-type-3");
exports.laserSliders = [laserSlider0, laserSlider1, laserSlider2, laserSlider3];
exports.laserPowers = [laserPower0, laserPower1, laserPower2, laserPower3];
exports.laserOnOffBtns = [laserOnOffBtn0, laserOnOffBtn1, laserOnOffBtn2, laserOnOffBtn3];
exports.laserWaveLengths = [
    laserWaveLength0,
    laserWaveLengt1,
    laserWaveLength2,
    laserWaveLength3
];
function laserOff(i) {
    exports.laserSliders[i].disabled = true;
    exports.laserSliders[i].classList.add("grayed-out");
    exports.laserWaveLengths[i].classList.add("grayed-out");
    exports.laserPowers[i].classList.add("grayed-out");
    exports.laserOnOffBtns[i].classList.add("laser-btn-off");
    exports.laserOnOffBtns[i].classList.remove("laser-btn-on");
}
exports.laserOff = laserOff;
function laserOn(i) {
    exports.laserSliders[i].disabled = false;
    exports.laserSliders[i].classList.remove("grayed-out");
    exports.laserWaveLengths[i].classList.remove("grayed-out");
    exports.laserPowers[i].classList.remove("grayed-out");
    exports.laserOnOffBtns[i].classList.remove("laser-btn-off");
    exports.laserOnOffBtns[i].classList.add("laser-btn-on");
}
exports.laserOn = laserOn;

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
function sendParamChange(input) {
    let target = input.id;
    let resource;
    console.log("send param change");
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
    console.log(JSON.stringify({
        newValue: Number(input.value)
    }));
    fetch("/prismState/scanParams/" + resource, {
        method: "PUT",
        body: JSON.stringify({
            newValue: Number(input.value)
        }),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then(res => res.json())
        .then(body => console.log(body));
}
exports.sendParamChange = sendParamChange;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*slider initialization*/
const lasers_1 = require("./initializations/lasers");
/*numpad initialization*/
const numpad_1 = require("./initializations/numpad");
/*parameters initialization*/
const scanParameteres_1 = require("./initializations/scanParameteres");
/*drag capabilties*/
const drag_1 = require("./drag-pinch-joystick/drag");
/*pinch capabilties*/
const pinch_1 = require("./drag-pinch-joystick/pinch");
/*joystick capabilties*/
const joystick_1 = require("./drag-pinch-joystick/joystick");
/*z slider sensitivity */
const movInfo_1 = require("./drag-pinch-joystick/movInfo");
const classes_1 = require("./initializations/classes");
/*last item in focus*/
let lastFocus = undefined;
/*start btn  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
let state = new classes_1.State();
prepareUI();
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
/*laser slider move event */
lasers_1.laserSliders.forEach((laserSlider, i) => {
    laserSlider.oninput = function () {
        let tempValue = laserSlider.value;
        lasers_1.laserPowers[i].innerHTML = tempValue + "%";
        //  state.lasers[i].power = Number(tempValue);
    };
});
/*turn on/off lasers */
lasers_1.laserOnOffBtns.forEach((laserBtn, i) => {
    laserBtn.addEventListener("click", () => {
        state.lasers[i].isOn = !state.lasers[i].isOn;
        if (state.lasers[i].isOn)
            lasers_1.laserOn(i);
        else
            lasers_1.laserOff(i);
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
            lastFocus.value += i;
            scanParameteres_1.sendParamChange(lastFocus);
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
/*add dragable capabilities*/
drag_1.dragInfos.forEach(info => {
    info.area.addEventListener("touchstart", drag_1.dragStart);
    info.area.addEventListener("touchmove", drag_1.drag);
    info.area.addEventListener("touchend", drag_1.dragEnd);
    info.area.addEventListener("mousedown", drag_1.dragStart);
    info.area.addEventListener("mousemove", drag_1.drag);
    info.area.addEventListener("mouseup", drag_1.dragEnd);
});
/*add pinchable capabilities*/
pinch_1.pinchInfos.forEach(info => {
    info.pinchArea.addEventListener("touchstart", pinch_1.pinchStart);
    info.pinchArea.addEventListener("touchmove", pinch_1.pinch);
    info.pinchArea.addEventListener("touchend", pinch_1.pinchEnd);
});
joystick_1.joystickInfos.forEach(info => {
    info.area.addEventListener("touchstart", joystick_1.joyStart);
    info.area.addEventListener("touchmove", joystick_1.joyMove);
    info.area.addEventListener("touchend", joystick_1.joyEnd);
    info.area.addEventListener("mousedown", joystick_1.joyStart);
    info.area.addEventListener("mousemove", joystick_1.joyMove);
    info.area.addEventListener("mouseup", joystick_1.joyEnd);
});
movInfo_1.zSensBtn.addEventListener("click", () => {
    movInfo_1.zSensBtn.innerHTML = movInfo_1.zSenses[(movInfo_1.zSenses.indexOf(movInfo_1.zSensBtn.innerHTML) + 1) % movInfo_1.zSenses.length];
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
function prepareUI() {
    lasers_1.laserSliders.forEach(slider => {
        slider.disabled = true;
        slider.classList.add("grayed-out");
    });
    lasers_1.laserOnOffBtns.forEach(sliderBtn => sliderBtn.classList.add("laser-btn-off"));
    lasers_1.laserWaveLengths.forEach(sliderColor => sliderColor.classList.add("grayed-out"));
    lasers_1.laserPowers.forEach(sliderValue => sliderValue.classList.add("grayed-out"));
    scanParameteres_1.UIparameters.forEach(parameter => (parameter.value = "0"));
    movInfo_1.zSensBtn.innerHTML = movInfo_1.zSenses[0];
}
setInterval(getCurrentState, 200);
//getCurrentState();
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then(newState => {
        state = newState;
    })
        .then(updateUIParameters)
        .then(updateUILasers);
}
function updateUIParameters() {
    scanParameteres_1.UIparameters[0].value = state.scanParams.offset.x.current.toString();
    scanParameteres_1.UIparameters[1].value = state.scanParams.offset.y.current.toString();
    scanParameteres_1.UIparameters[2].value = state.scanParams.offset.z.current.toString();
    scanParameteres_1.UIparameters[3].value = state.scanParams.pixelNumber.x.current.toString();
    scanParameteres_1.UIparameters[4].value = state.scanParams.pixelNumber.y.current.toString();
    scanParameteres_1.UIparameters[5].value = state.scanParams.pixelNumber.z.current.toString();
    scanParameteres_1.UIparameters[6].value = state.scanParams.range.x.current.toString();
    scanParameteres_1.UIparameters[7].value = state.scanParams.range.y.current.toString();
    scanParameteres_1.UIparameters[8].value = state.scanParams.range.z.current.toString();
    scanParameteres_1.UIparameters[9].value = state.scanParams.dwellTime.toString();
}
function updateUILasers() {
    state.lasers.forEach((stateLaser, i) => {
        lasers_1.laserPowers[i].innerHTML = stateLaser.power.toString();
        lasers_1.laserSliders[i].value = state.lasers[i].power.toString();
        if (state.lasers[i].isOn)
            lasers_1.laserOn(i);
        else
            lasers_1.laserOff(i);
        lasers_1.laserWaveLengths[i].innerHTML = stateLaser.waveLength.toString();
    });
}
function updateUIPads() {
    drag_1.dragInfos[0].relPos.left = state.scanParams.offset.x.current;
    drag_1.dragInfos[0].relPos.top = state.scanParams.offset.y.current;
}
//incomplete
function sendLaserData(targetWaveLength) {
    fetch(`prismState/lasers/${targetWaveLength}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({})
    });
}
function sendScanParam() { }

},{"./drag-pinch-joystick/drag":1,"./drag-pinch-joystick/joystick":2,"./drag-pinch-joystick/movInfo":3,"./drag-pinch-joystick/pinch":4,"./initializations/classes":5,"./initializations/lasers":6,"./initializations/numpad":7,"./initializations/scanParameteres":8}]},{},[9]);
