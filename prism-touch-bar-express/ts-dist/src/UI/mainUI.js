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
/*start btn  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
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
/*add draggable capabilities*/
exports.lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
/*add joystick capabilities*/
let zMotor = new joystickObj_1.SliderJoystickObj(movObj_1.zThumb, movObj_1.zSlider);
let xyMotor = new circJoystick_1.CircJoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
movObj_1.zSensBtn.addEventListener("click", () => {
    movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
});
exports.lookSurface.area.addEventListener("touchmove", () => {
    scanParameteres_1.UIparameters[0].value = String((exports.lookSurface.leftRelPos * scanParameteres_1.limits[0].max) / exports.lookSurface.areaWidth);
    scanParameteres_1.UIparameters[1].value = String((exports.lookSurface.topRelPos * scanParameteres_1.limits[1].max) / exports.lookSurface.areaHeight);
    scanParameteres_1.UIparameters[6].value = String((exports.lookSurface.elWidth * scanParameteres_1.limits[6].max) / exports.lookSurface.areaWidth);
    scanParameteres_1.UIparameters[7].value = String((exports.lookSurface.elHeight * scanParameteres_1.limits[7].max) / exports.lookSurface.areaHeight);
});
exports.lookSurface.area.addEventListener("touchend", () => {
    scanParameteres_1.sendParamChangeSingle("offset/x", Number(scanParameteres_1.UIparameters[0].value));
    scanParameteres_1.sendParamChangeSingle("offset/y", Number(scanParameteres_1.UIparameters[1].value));
    scanParameteres_1.sendParamChangeSingle("range/x", Number(scanParameteres_1.UIparameters[6].value));
    scanParameteres_1.sendParamChangeSingle("range/y", Number(scanParameteres_1.UIparameters[7].value));
});
//# sourceMappingURL=mainUI.js.map