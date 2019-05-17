(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaxMin {
    constructor() {
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
let limits = [];
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
const offsetX = document.querySelector("#offset-x");
const offsetY = document.querySelector("#offset-y");
const offsetZ = document.querySelector("#offset-z");
const pixelNumberX = document.querySelector("#pixelNumber-x");
const pixelNumberY = document.querySelector("#pixelNumber-y");
const pixelNumberZ = document.querySelector("#pixelNumber-z");
const rangeX = document.querySelector("#range-x");
const rangeY = document.querySelector("#range-y");
const rangeZ = document.querySelector("#range-z");
const dwellTime = document.querySelector("#dwellTime");
const totalTime = document.querySelector("#totalTime");
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
console.log(offsetX);
exports.UIparameters.forEach(param => {
    console.log(param);
    limits.push(new Limit(param.id));
});
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
//export const limits: MaxMin[] = [];
//fills limits
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
    document.getElementById("dwellTime").value = scanParams.dwellTime.value.toString();
}
exports.updateUIParameters = updateUIParameters;
function updateLimits(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        limits.find(limit => limit.id == scanParams[prop].x.name).max = scanParams[prop].x.max;
        limits.find(limit => limit.id == scanParams[prop].x.name).min = scanParams[prop].x.min;
        limits.find(limit => limit.id == scanParams[prop].y.name).max = scanParams[prop].y.max;
        limits.find(limit => limit.id == scanParams[prop].y.name).min = scanParams[prop].y.min;
        limits.find(limit => limit.id == scanParams[prop].z.name).max = scanParams[prop].z.max;
        limits.find(limit => limit.id == scanParams[prop].z.name).min = scanParams[prop].z.min;
    });
    limits.find(limit => limit.id == "dwellTime").max = scanParams.dwellTime.max;
    /*
    limits[0].max = scanParams.offset.x.max;
    limits[0].min = scanParams.offset.x.min;
    limits[1].max = scanParams.offset.y.max;
    limits[1].min = scanParams.offset.y.min;
    limits[2].max = scanParams.offset.z.max;
    limits[2].min = scanParams.offset.z.min;
  
    limits[3].max = scanParams.pixelNumber.x.max;
    limits[3].min = scanParams.pixelNumber.x.min;
    limits[4].max = scanParams.pixelNumber.y.max;
    limits[4].min = scanParams.pixelNumber.y.min;
    limits[5].max = scanParams.pixelNumber.z.max;
    limits[5].min = scanParams.pixelNumber.z.min;
  
    limits[6].max = scanParams.range.x.max;
    limits[6].min = scanParams.range.x.min;
    limits[7].max = scanParams.range.y.max;
    limits[7].min = scanParams.range.y.min;
    limits[8].max = scanParams.range.z.max;
    limits[8].min = scanParams.range.z.min;
    */
    console.log("limit: ");
    console.log(limits);
}
exports.updateLimits = updateLimits;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
import { updateUILasersFromLasers, updateUILasersFromState } from "./UIparts/lasers";
import { lookSurface } from "./mainUI";
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



function updateUIPads(newState: MicroState) {
  lookSurface.leftRelPos = (newState.scanParams.offset.x.value * lookSurface.areaWidth) / limits[0].max;
  lookSurface.topRelPos = (newState.scanParams.offset.y.value * lookSurface.areaHeight) / limits[1].max;
  lookSurface.elWidth = (newState.scanParams.range.x.value * lookSurface.areaWidth) / limits[6].max;
  lookSurface.elHeight = (newState.scanParams.range.y.value * lookSurface.areaHeight) / limits[7].max;
}

export function sendMode(newMode: string) {
  fetch("/prismState/mode", {
    method: "PUT",
    body: JSON.stringify({ newMode }),
    headers: {
      "Content-type": "application/json"
    }
  });
}

*/
const scanParameteres_1 = require("./UIparts/scanParameteres");
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then((newState) => {
        scanParameteres_1.updateLimits(newState.scanParams);
        //updateUILasersFromState(newState);
        scanParameteres_1.updateUIParameters(newState.scanParams);
        //updateUIPads(newState);
    });
}
exports.getCurrentState = getCurrentState;

},{"./UIparts/scanParameteres":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*UI SSE updater*/
const UIupdater_1 = require("./UIupdater");
/*get microscope state on UI start-up */
UIupdater_1.getCurrentState();
//setUpUpdater();
/* mode btns events

liveBtn.addEventListener("click", () => {
  if (currentMode === "live") {
    liveBtn.classList.remove("highlighted-button");
    sendMode("stand-by");
  } else {
    liveBtn.classList.add("highlighted-button");
    sendMode("live");
  }
});

captureBtn.addEventListener("click", () => {
  if (currentMode === "capture") {
    captureBtn.classList.remove("highlighted-button");
    sendMode("stand-by");
  } else {
    captureBtn.classList.add("highlighted-button");
    sendMode("capture");
  }
});

stackBtn.addEventListener("click", () => {
  if (currentMode === "stack") {
    stackBtn.classList.remove("highlighted-button");
    sendMode("stand-by");
  } else {
    stackBtn.classList.add("highlighted-button");
    sendMode("stack");
  }
});

/*UI scanning parameters settings */
/*last item in focus
let lastFocus: HTMLInputElement = undefined;

/*store last parameters input in focus
UIparameters.forEach(param => {
  param.addEventListener("touchstart", () => {
    removeHighlithBoder();
    lastFocus = param;
    param.value = "";
    param.classList.add("highlighted");
  });
});

/*remove highlight border only when touching something excluding numpad and selectred parameter
document.body.addEventListener("click", function(e) {
  if (lastFocus != null) {
    if (numPad.filter(numBtn => numBtn === e.target).length == 0) {
      if (e.target !== delBtn && e.target !== dotBtn)
        if (UIparameters.filter(param => param === e.target).length == 0) {
          removeHighlithBoder();
          sendParamChange(lastFocus);
          lastFocus = null;
        }
    }
  }
});

function removeHighlithBoder() {
  UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

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
/*add touched num in last focus element
numPad.forEach((numBtn, i) => {
  numBtn.addEventListener("click", () => {
    if (lastFocus != null) {
      lastFocus.classList.add("highlighted");
      let lastFocusParamIndex = UIparameters.indexOf(lastFocus);

      if (
        Number(UIparameters[lastFocusParamIndex].value + i) > limits[lastFocusParamIndex].max ||
        Number(UIparameters[lastFocusParamIndex].value + i) < limits[lastFocusParamIndex].min
      ) {
        lastFocus.classList.add("limit");
        setTimeout(() => lastFocus.classList.remove("limit"), 600);
      } else {
        lastFocus.value += i;
        sendParamChange(lastFocus);
      }
    }
  });
});

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

export const lookSurface = new PinchObj(inspectArea, sampleArea, 20);

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

},{"./UIupdater":2}]},{},[3]);
