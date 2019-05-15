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
const sliderJoystickObj_1 = require("./UIparts/drag-pinch-joystick/sliderJoystickObj");
/*pinch class*/
const pinchObj_1 = require("./UIparts/drag-pinch-joystick/pinchObj");
/*circular joystick class*/
const circJoystick_1 = require("./UIparts/drag-pinch-joystick/circJoystick");
/*UI SSE updater*/
const UIupdater_1 = require("./UIupdater");
const mode_1 = require("./UIparts/mode");
/*get microscope state on UI start-up */
UIupdater_1.getCurrentState();
UIupdater_1.setUpUpdater();
/* mode btns events */
mode_1.liveBtn.addEventListener("click", () => {
    if (mode_1.currentMode === "live") {
        mode_1.liveBtn.classList.remove("highlighted-button");
        UIupdater_1.sendMode("stand-by");
    }
    else {
        mode_1.liveBtn.classList.add("highlighted-button");
        UIupdater_1.sendMode("live");
    }
});
mode_1.captureBtn.addEventListener("click", () => {
    if (mode_1.currentMode === "capture") {
        mode_1.captureBtn.classList.remove("highlighted-button");
        UIupdater_1.sendMode("stand-by");
    }
    else {
        mode_1.captureBtn.classList.add("highlighted-button");
        UIupdater_1.sendMode("capture");
    }
});
mode_1.stackBtn.addEventListener("click", () => {
    if (mode_1.currentMode === "stack") {
        mode_1.stackBtn.classList.remove("highlighted-button");
        UIupdater_1.sendMode("stand-by");
    }
    else {
        mode_1.stackBtn.classList.add("highlighted-button");
        UIupdater_1.sendMode("stack");
    }
});
/*UI scanning parameters settings */
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
/*Laser boxes events */
/*adds event to slider box for slider movement and on/off button*/
lasers_1.laserUIBoxes.forEach(laserUIBox => {
    laserUIBox.slider.addEventListener("input", () => {
        let tempValue = laserUIBox.slider.value;
        laserUIBox.powerLabel.innerHTML = tempValue + "%";
    });
    laserUIBox.slider.addEventListener("touchend", () => {
        let tempValue = laserUIBox.slider.value;
        laserUIBox.powerLabel.innerHTML = tempValue + "%";
        lasers_1.sendLaserData(laserUIBox);
    });
    laserUIBox.btn.addEventListener("click", () => {
        laserUIBox.isOn = !laserUIBox.isOn;
        if (laserUIBox.isOn)
            lasers_1.grayOutLaserBox(laserUIBox);
        else
            lasers_1.lightUpLaserBox(laserUIBox);
        lasers_1.sendLaserData(laserUIBox);
    });
});
/*Numpad events */
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
/*look surface events*/
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
/*motor sliders */
/*joystick initializations*/
let zMotor = new sliderJoystickObj_1.SliderJoystickObj(movObj_1.zThumb, movObj_1.zSlider);
let xyMotor = new circJoystick_1.CircJoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
/*change z joystick sensibility when touched */
movObj_1.zSensBtn.addEventListener("click", () => {
    movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
});
let intervalCheckerXY;
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
let intervalCheckerZ;
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
            .then(resBoby => console.log(resBoby));
    }, 200);
});
zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));
//# sourceMappingURL=mainUI.js.map