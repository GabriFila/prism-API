"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circJoystick_1 = require("./drag-pinch-joystick/circJoystick");
const movObj_1 = require("./drag-pinch-joystick/movObj");
const sliderJoystickObj_1 = require("./drag-pinch-joystick/sliderJoystickObj");
const toFromAPI_1 = require("../toFromAPI");
function setUpMotorsControls() {
    let xyMotor = new circJoystick_1.CircJoystickObj(movObj_1.joyThumb, movObj_1.joyPad);
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
    let zMotor = new sliderJoystickObj_1.SliderJoystickObj(movObj_1.zThumb, movObj_1.zSlider);
    let intervalCheckerZ;
    zMotor.element.addEventListener("touchstart", () => {
        intervalCheckerZ = setInterval(() => {
            toFromAPI_1.sendPut("prismState/motors/z", Number(zMotor.sliderValue) * Number(movObj_1.zSensBtn.innerHTML.slice(0, -1)));
        }, 200);
    });
    zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));
    //change z joystick sensibility when touched
    movObj_1.zSensBtn.addEventListener("click", () => {
        movObj_1.zSensBtn.innerHTML = movObj_1.zSenses[(movObj_1.zSenses.indexOf(movObj_1.zSensBtn.innerHTML) + 1) % movObj_1.zSenses.length];
    });
}
exports.setUpMotorsControls = setUpMotorsControls;
//# sourceMappingURL=motorsControls.js.map