"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*slider initialization*/
const lasers_1 = require("./UIparts/lasers");
/*numpad initialization*/
const numpad_1 = require("./UIparts/numpad");
/*parameters initialization*/
const scanParameteres_1 = require("./UIparts/scanParameteres");
/*joystick capabilties*/
const joystickObj_1 = require("./UIparts/drag-pinch-joystick/joystickObj");
/*pinch capabilties*/
const pinchObj_1 = require("./UIparts/drag-pinch-joystick/pinchObj");
/*z slider sensitivity */
const movObj_1 = require("./UIparts/drag-pinch-joystick/movObj");
/*last item in focus*/
let lastFocus = undefined;
/*start btn  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
document.body.addEventListener("click", function (e) {
    //remove highlight border only when touching something excluding numpad and selectred parameter
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
//adds event to slider box for slider movement and on/off button
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
//let lookSurface = new DragObj(inspectArea, sampleArea);
let lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
/*add joystick capabilities*/
let xyMotor = new joystickObj_1.JoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
let zMotor = new joystickObj_1.JoystickObj(movObj_1.zThumb, movObj_1.zSlider);
movObj_1.zSensBtn.addEventListener("click", () => {
    movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
//setInterval(getCurrentState, 200);
getCurrentState();
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then(newState => {
        newState;
        scanParameteres_1.updateLimits(newState);
        lasers_1.updateUILasers(newState);
        scanParameteres_1.updateUIParameters(newState);
        // updateUIPads(newState);
    });
}
function updateUIPads(newState) {
    lookSurface.leftRelPos = newState.scanParams.offset.x.current;
    lookSurface.topRelPos = newState.scanParams.offset.y.current;
}
const source = new EventSource("/updates");
source.addEventListener("state-updated", (event) => {
    let newState = JSON.parse(event.data);
    scanParameteres_1.updateLimits(newState);
    lasers_1.updateUILasers(newState);
    scanParameteres_1.updateUIParameters(newState);
    // updateUIPads(newState);
});
/*
lookSurface.area.addEventListener("touchmove", () => {
  fetch("/prismState/scanParams/offset/x", {
    method: "PUT",
    body: JSON.stringify({
      newValue: Number(lookSurface.leftRelPos)
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  fetch("/prismState/scanParams/offset/y", {
    method: "PUT",
    body: JSON.stringify({
      newValue: Number(lookSurface.topRelPos)
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
})
*/ 
//# sourceMappingURL=mainUI.js.map