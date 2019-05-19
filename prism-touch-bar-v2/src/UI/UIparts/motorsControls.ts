import { CircJoystickObj } from "./drag-pinch-joystick/circJoystick";
import { joyThumb, joyPad, zThumb, zSlider, zSensBtn, zSenses } from "./drag-pinch-joystick/movObj";
import { SliderJoystickObj } from "./drag-pinch-joystick/sliderJoystickObj";
import { sendPut } from "../toFromAPI";

export function setUpMotorsControls() {
  let xyMotor = new CircJoystickObj(joyThumb, joyPad);

  let intervalCheckerXY: NodeJS.Timeout;
  xyMotor.element.addEventListener("touchstart", () => {
    intervalCheckerXY = setInterval(() => {
      if (xyMotor.mag > 0) {
        sendPut("prismState/motors/x", (xyMotor.mag * Math.cos(xyMotor.arg)) / xyMotor.maxMag);
        sendPut("prismState/motors/y", (xyMotor.mag * Math.sin(xyMotor.arg)) / xyMotor.maxMag);
      }
    }, 200);
  });

  xyMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerXY));

  //x motor slider
  let zMotor = new SliderJoystickObj(zThumb, zSlider);
  let intervalCheckerZ: NodeJS.Timeout;

  zMotor.element.addEventListener("touchstart", () => {
    intervalCheckerZ = setInterval(() => {
      sendPut("prismState/motors/z", Number(zMotor.sliderValue) * Number(zSensBtn.innerHTML.slice(0, -1)));
    }, 200);
  });

  zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));

  //change z joystick sensibility when touched

  zSensBtn.addEventListener("click", () => {
    zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
  });
}
