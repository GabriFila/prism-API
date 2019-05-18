(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./movObj":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./dragObj":1}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
    check(value) {
        console.log("value: " + value);
        console.log("max: " + this.max);
        console.log("min: " + this.min);
        console.log("check: " + (value <= this.max && value >= this.min));
        return value <= this.max && value >= this.min;
    }
}
const tempUIparams = document.querySelectorAll(".param-input");
exports.UIparameters = [];
//remove grayed out elemts from tempUIparameters
tempUIparams.forEach(param => {
    if (!param.classList.contains("grayed-out")) {
        exports.UIparameters.push(param);
    }
});
//initialize limit array
exports.limits = [];
exports.UIparameters.forEach(param => exports.limits.push(new Limit(param.id)));
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

},{}],6:[function(require,module,exports){
"use strict";
/*
import { updateUILasersFromLasers, updateUILasersFromState } from "./UIparts/lasers";
import { updateMode } from "./UIparts/mode";
import { MicroState } from "../model";

const source = new EventSource("/updates");

export function setUpUpdater() {
  source.addEventListener("updated-offset-x", (event: any) => {
    UIparameters[0].value = JSON.parse(event.data).newValue;
    lookSurface.leftRelPos = (Number(UIparameters[0].value) * lookSurface.areaWidth) / limits[0].max;
  });
  source.addEventListener("updated-offset-y", (event: any) => {
    UIparameters[1].value = JSON.parse(event.data).newValue;
    lookSurface.topRelPos = (Number(UIparameters[1].value) * lookSurface.areaHeight) / limits[1].max;
  });
  source.addEventListener("updated-offset-z", (event: any) => {
    UIparameters[2].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("updated-pixelNumber-x", (event: any) => {
    UIparameters[3].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("updated-pixelNumber-y", (event: any) => {
    UIparameters[4].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("updated-pixelNumber-z", (event: any) => {
    UIparameters[5].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("updated-range-x", (event: any) => {
    UIparameters[6].value = JSON.parse(event.data).newValue;
    lookSurface.elWidth = (Number(UIparameters[6].value) * lookSurface.areaWidth) / limits[6].max;
  });
  source.addEventListener("updated-range-y", (event: any) => {
    UIparameters[7].value = JSON.parse(event.data).newValue;
    lookSurface.elHeight = (Number(UIparameters[7].value) * lookSurface.areaHeight) / limits[7].max;
  });
  source.addEventListener("updated-range-z", (event: any) => {
    UIparameters[8].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("updated-dwellTime", (event: any) => {
    UIparameters[9].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("limits-updated", (event: any) => {
    let newState = JSON.parse(event.data);
    updateLimits(newState);
    updateUIPads(newState);
  });

  source.addEventListener("updated-lasers", (event: any) => {
    updateUILasersFromLasers(JSON.parse(event.data));
  });

  source.addEventListener("updated-mode", (event: any) => {
    updateMode(JSON.parse(event.data).newMode);
  });

  source.addEventListener("updated-state", (event: any) => {
    let newState = JSON.parse(event.data).newState;
    updateLimits(newState);
    updateUIPads(newState);
    updateUILasersFromState(newState);
    updateUIParameters(newState);
  });
}




*/
Object.defineProperty(exports, "__esModule", { value: true });
function sendPut(resource, newValue) {
    console.log("resource: " + resource);
    fetch(`/${resource}`, {
        method: "PUT",
        body: JSON.stringify({ newValue }),
        headers: {
            "Content-type": "application/json"
        }
    });
}
exports.sendPut = sendPut;
const scanParameteres_1 = require("./UIparts/scanParameteres");
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then((newState) => {
        updateLimits(newState.scanParams);
        //updateUILasersFromState(newState);
        updateUIParameters(newState.scanParams);
        updateUIPads(newState.scanParams);
    });
}
exports.getCurrentState = getCurrentState;
const mainUI_1 = require("./mainUI");
function updateUIPads(scanParams) {
    mainUI_1.lookSurface.leftRelPos =
        (scanParams.offset.x.value * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParams.offset.x.name).max;
    mainUI_1.lookSurface.topRelPos =
        (scanParams.offset.y.value * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParams.offset.y.name).max;
    mainUI_1.lookSurface.elWidth = (scanParams.range.x.value * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParams.range.x.name).max;
    mainUI_1.lookSurface.elHeight =
        (scanParams.range.y.value * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParams.range.y.name).max;
}
function updateUIParameters(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        document.getElementById(scanParams[prop].x.name).value = scanParams[prop].x.value.toString();
        document.getElementById(scanParams[prop].y.name).value = scanParams[prop].y.value.toString();
        document.getElementById(scanParams[prop].z.name).value = scanParams[prop].z.value.toString();
    });
    document.getElementById("scanParams-dwellTime").value = scanParams.dwellTime.value.toString();
}
function updateLimits(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].x.name).max = scanParams[prop].x.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].x.name).min = scanParams[prop].x.min;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].y.name).max = scanParams[prop].y.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].y.name).min = scanParams[prop].y.min;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].z.name).max = scanParams[prop].z.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].z.name).min = scanParams[prop].z.min;
    });
    scanParameteres_1.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}

},{"./UIparts/scanParameteres":5,"./mainUI":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*laser elements*/
//import { laserUIBoxes, grayOutLaserBox, lightUpLaserBox, sendLaserData } from "./UIparts/lasers";
/*numpad element*/
const numpad_1 = require("./UIparts/numpad");
/*parameters elements and methods*/
//import { UIparameters, sendParamChange, limits, sendParamChangeSingle } from "./UIparts/scanParameteres";
/*UI pads,joysticks objects */
const movObj_1 = require("./UIparts/drag-pinch-joystick/movObj");
/*pinch class*/
const pinchObj_1 = require("./UIparts/drag-pinch-joystick/pinchObj");
/*UI SSE updater*/
const UIupdater_1 = require("./UIupdater");
const scanParameteres_1 = require("./UIparts/scanParameteres");
/*get microscope state on UI start-up */
const modeBtns = document.querySelectorAll(".mode-btn");
// mode btns events
modeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("highlighted-button")) {
            btn.classList.remove("highlighted-button");
            UIupdater_1.sendPut("prismState/mode", "stop");
        }
        else {
            modeBtns.forEach(btn => btn.classList.remove("highlighted-button"));
            btn.classList.add("highlighted-button");
            UIupdater_1.sendPut("prismState/mode", btn.id.split("-")[0]);
        }
    });
});
//last item in focus
let lastFocus = undefined;
//remove highlight border only when touching something excluding numpad and selectred parameter
document.body.addEventListener("click", function (e) {
    if (lastFocus != null) {
        if (numpad_1.numPad.filter(numBtn => numBtn === e.target).length == 0) {
            if (e.target !== numpad_1.delBtn && e.target !== numpad_1.dotBtn)
                if (scanParameteres_1.UIparameters.filter(param => param === e.target).length == 0) {
                    removeHighlithBoder();
                    UIupdater_1.sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
                    lastFocus = null;
                }
        }
    }
});
//store last parameters input in focus
scanParameteres_1.UIparameters.forEach(param => {
    param.addEventListener("touchstart", () => {
        removeHighlithBoder();
        lastFocus = param;
        param.value = "";
        param.classList.add("highlighted");
    });
});
//add touched num in last focus element
numpad_1.numPad.forEach((numBtn, i) => {
    numBtn.addEventListener("click", () => {
        if (lastFocus != null) {
            lastFocus.classList.add("highlighted");
            if (scanParameteres_1.limits.find(limit => limit.id == lastFocus.id).check(Number(lastFocus.value + i))) {
                lastFocus.value += i;
                UIupdater_1.sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
            }
            else {
                lastFocus.classList.add("limit");
                setTimeout(() => lastFocus.classList.remove("limit"), 600);
            }
        }
    });
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
UIupdater_1.getCurrentState();
//setUpUpdater();
/*UI scanning parameters settings */
/*Laser boxes events */
/*adds event to slider box for slider movement and on/off button
laserUIBoxes.forEach(laserUIBox => {
  laserUIBox.slider.addEventListener("input", () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
  });
  laserUIBox.slider.addEventListener("touchend", () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
    sendLaserData(laserUIBox);
  });
  laserUIBox.btn.addEventListener("click", () => {
    laserUIBox.isOn = !laserUIBox.isOn;
    if (laserUIBox.isOn) grayOutLaserBox(laserUIBox);
    else lightUpLaserBox(laserUIBox);
    sendLaserData(laserUIBox);
  });
});

/*Numpad events */
/*add dot to last focus element when dot button pressed
dotBtn.addEventListener("click", () => {
  if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
    lastFocus.classList.add("highlighted");
    lastFocus.value += ".";
  }
});

/*delete number to last focus element when delete button pressed
delBtn.addEventListener("click", () => {
  if (lastFocus != null) {
    lastFocus.classList.add("highlighted");
    lastFocus.value = lastFocus.value.slice(0, -1); /*remove last character
    sendParamChange(lastFocus);
  }
});

/*look surface events


/*update own UI parameters
lookSurface.area.addEventListener("touchmove", () => {
  UIparameters[0].value = String((lookSurface.leftRelPos * limits[0].max) / lookSurface.areaWidth);
  UIparameters[1].value = String((lookSurface.topRelPos * limits[1].max) / lookSurface.areaHeight);
  UIparameters[6].value = String((lookSurface.elWidth * limits[6].max) / lookSurface.areaWidth);
  UIparameters[7].value = String((lookSurface.elHeight * limits[7].max) / lookSurface.areaHeight);
});

/*send parameter change when untouched
lookSurface.area.addEventListener("touchend", () => {
  sendParamChangeSingle("offset/x", Number(UIparameters[0].value));
  sendParamChangeSingle("offset/y", Number(UIparameters[1].value));
  sendParamChangeSingle("range/x", Number(UIparameters[6].value));
  sendParamChangeSingle("range/y", Number(UIparameters[7].value));
});

/*motor sliders */
/*joystick initializations
let zMotor = new SliderJoystickObj(zThumb, zSlider);
let xyMotor = new CircJoystickObj(joyThumb, joyPad);

/*change z joystick sensibility when touched
zSensBtn.addEventListener("click", () => {
  zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
});

let intervalCheckerXY: NodeJS.Timeout;

xyMotor.element.addEventListener("touchstart", () => {
  intervalCheckerXY = setInterval(() => {
    if (xyMotor.mag > 0) {
      fetch("/prismMotors/x", {
        method: "PUT",
        body: JSON.stringify({ steps: (xyMotor.mag * Math.cos(xyMotor.arg)) / xyMotor.maxMag }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    fetch("/prismMotors/y", {
      method: "PUT",
      body: JSON.stringify({ steps: (xyMotor.mag * Math.sin(xyMotor.arg)) / xyMotor.maxMag }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }, 200);
});

xyMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerXY));

let intervalCheckerZ: NodeJS.Timeout;

zMotor.element.addEventListener("touchstart", () => {
  intervalCheckerZ = setInterval(() => {
    fetch("/prismMotors/z", {
      method: "PUT",
      body: JSON.stringify({ steps: zMotor.sliderValue }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
  }, 200);
});

zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));

*/
exports.lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);

},{"./UIparts/drag-pinch-joystick/movObj":2,"./UIparts/drag-pinch-joystick/pinchObj":3,"./UIparts/numpad":4,"./UIparts/scanParameteres":5,"./UIupdater":6}]},{},[7]);
