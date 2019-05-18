"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*numpad element*/
const numpad_1 = require("./UIparts/numpad");
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
const scanParameteres_1 = require("./UIparts/scanParameteres");
const lasers_1 = require("./UIparts/lasers");
/*get microscope state on UI start-up */
const modeBtns = document.querySelectorAll(".mode-btn");
UIupdater_1.getCurrentState();
//setUpUpdater();
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
/*UI scanning parameters settings */
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
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
//adds event to slider box for slider movement and on/off button
lasers_1.laserUIRows.forEach(laserUIRow => {
    laserUIRow.slider.addEventListener("input", () => {
        let tempValue = laserUIRow.slider.value;
        laserUIRow.powerLabel.innerHTML = tempValue + "%";
    });
    laserUIRow.slider.addEventListener("touchend", () => {
        let tempValue = laserUIRow.slider.value;
        laserUIRow.powerLabel.innerHTML = tempValue + "%";
        UIupdater_1.sendPut(`prismState/lasers/power?waveLength=${laserUIRow.waveLength}`, Number(laserUIRow.power));
    });
    laserUIRow.btn.addEventListener("click", () => {
        laserUIRow.isOn = !laserUIRow.isOn;
        UIupdater_1.sendPut(`prismState/lasers/isOn?waveLength=${laserUIRow.waveLength}`, laserUIRow.isOn);
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
/*Numpad events */
//add dot to last focus element when dot button pressed
numpad_1.dotBtn.addEventListener("click", () => {
    if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
        lastFocus.classList.add("highlighted");
        lastFocus.value += ".";
    }
});
//delete number to last focus element when delete button pressed
numpad_1.delBtn.addEventListener("click", () => {
    if (lastFocus != null) {
        lastFocus.classList.add("highlighted");
        lastFocus.value = lastFocus.value.slice(0, -1); //remove last character
        UIupdater_1.sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
    }
});
//look surface events
exports.lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
//update own UI parameters
exports.lookSurface.area.addEventListener("touchmove", () => {
    document.getElementById("scanParams-offset-x").value = String((exports.lookSurface.leftRelPos * scanParameteres_1.limits.find(limit => limit.id == "scanParams-offset-x").max) / exports.lookSurface.areaWidth);
    document.getElementById("scanParams-offset-y").value = String((exports.lookSurface.topRelPos * scanParameteres_1.limits.find(limit => limit.id == "scanParams-offset-y").max) / exports.lookSurface.areaHeight);
    document.getElementById("scanParams-range-x").value = String((exports.lookSurface.elWidth * scanParameteres_1.limits.find(limit => limit.id == "scanParams-range-x").max) / exports.lookSurface.areaWidth);
    document.getElementById("scanParams-range-y").value = String((exports.lookSurface.elHeight * scanParameteres_1.limits.find(limit => limit.id == "scanParams-range-y").max) / exports.lookSurface.areaHeight);
});
//send parameter change when untouched
exports.lookSurface.area.addEventListener("touchend", () => {
    UIupdater_1.sendPut("prismState/scanParams/offset/x", Number(document.getElementById("scanParams-offset-x").value));
    UIupdater_1.sendPut("prismState/scanParams/offset/y", Number(document.getElementById("scanParams-offset-x").value));
    UIupdater_1.sendPut("prismState/scanParams/range/x", Number(document.getElementById("scanParams-range-x").value));
    UIupdater_1.sendPut("prismState/scanParams/range/y", Number(document.getElementById("scanParams-range-y").value));
});
/*motor sliders */
let xyMotor = new circJoystick_1.CircJoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
let intervalCheckerXY;
xyMotor.element.addEventListener("touchstart", () => {
    intervalCheckerXY = setInterval(() => {
        if (xyMotor.mag > 0) {
            UIupdater_1.sendPut("prismState/motors/x", (xyMotor.mag * Math.cos(xyMotor.arg)) / xyMotor.maxMag);
            UIupdater_1.sendPut("prismState/motors/y", (xyMotor.mag * Math.sin(xyMotor.arg)) / xyMotor.maxMag);
        }
    }, 200);
});
xyMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerXY));
let zMotor = new sliderJoystickObj_1.SliderJoystickObj(movObj_1.zThumb, movObj_1.zSlider);
let intervalCheckerZ;
zMotor.element.addEventListener("touchstart", () => {
    intervalCheckerZ = setInterval(() => {
        UIupdater_1.sendPut("prismState/motors/z", Number(zMotor.sliderValue) * Number(movObj_1.zSensBtn.innerHTML.slice(0, -1)));
    }, 200);
});
zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));
//change z joystick sensibility when touched
movObj_1.zSensBtn.addEventListener("click", () => {
    movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
});
//# sourceMappingURL=mainUI.js.map