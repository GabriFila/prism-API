import { CircJoystickObj } from "../drag-pinch-joystick/circJoystick";
import { SliderJoystickObj } from "../drag-pinch-joystick/sliderJoystickObj";
import { sendPut } from "./toFromAPI";

const zThumb: HTMLDivElement = document.querySelector("#z-thumb");
const zSlider: HTMLDivElement = document.querySelector("#z-slider");
const joyPad: HTMLDivElement = document.querySelector("#joystick-pad");
const joyThumb: HTMLDivElement = document.querySelector("#joystick-thumb");
const zSensBtn: HTMLButtonElement = document.querySelector("#z-sens-btn");

export const zSenses: string[] = ["0.1x", "0.5x", "1x"];

export function setUpMotorsControls() {
  let xyMotor = new CircJoystickObj(joyThumb, joyPad);

  let intervalCheckerXY: NodeJS.Timeout;
  xyMotor.element.addEventListener("touchstart", () => {
    intervalCheckerXY = setInterval(() => {
      if (xyMotor.mag > 0) {
        sendPut("prismState/motors/x", (xyMotor.mag * Math.cos(xyMotor.arg)) / xyMotor.maxMag);
        sendPut("prismState/motors/y", (xyMotor.mag * Math.sin(xyMotor.arg)) / xyMotor.maxMag);
      }
    }, 500);
  });

  xyMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerXY));

  //x motor slider
  let zMotor = new SliderJoystickObj(zThumb, zSlider);
  let intervalCheckerZ: NodeJS.Timeout;

  zMotor.element.addEventListener("touchstart", () => {
    intervalCheckerZ = setInterval(() => {
      sendPut("prismState/motors/z", Number(zMotor.sliderValue) * Number(zSensBtn.innerHTML.slice(0, -1)));
    }, 500);
  });

  zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));

  //change z joystick sensibility when touched

  zSensBtn.addEventListener("click", () => {
    zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
  });
}
