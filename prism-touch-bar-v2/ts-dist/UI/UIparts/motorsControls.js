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
        }, 200);
    });
    xyMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerXY));
    //x motor slider
    let zMotor = new sliderJoystickObj_1.SliderJoystickObj(zThumb, zSlider);
    let intervalCheckerZ;
    zMotor.element.addEventListener("touchstart", () => {
        intervalCheckerZ = setInterval(() => {
            toFromAPI_1.sendPut("prismState/motors/z", Number(zMotor.sliderValue) * Number(zSensBtn.innerHTML.slice(0, -1)));
        }, 200);
    });
    zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));
    //change z joystick sensibility when touched
    zSensBtn.addEventListener("click", () => {
        zSensBtn.innerHTML = exports.zSenses[(exports.zSenses.indexOf(zSensBtn.innerHTML) + 1) % exports.zSenses.length];
    });
}
exports.setUpMotorsControls = setUpMotorsControls;
//# sourceMappingURL=motorsControls.js.map