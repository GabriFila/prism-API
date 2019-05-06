/*slider initialization*/
import { laserUIBoxes, grayOutLaserBox, lightUpLaserBox, updateUILasers } from "./UIparts/lasers";
/*numpad initialization*/
import { numPad, delBtn, dotBtn } from "./UIparts/numpad";
/*parameters initialization*/
import {
  UIparameters,
  presetSelector,
  addPresetBtn,
  /*presets, Preset,*/ sendParamChange,
  updateUIParameters,
  updateLimits,
  limits
} from "./UIparts/scanParameteres";
/*drag capabilties*/
/*pinch capabilties*/
import { pinchStart, pinch, pinchEnd, pinchInfos } from "./drag-pinch-joystick/pinch";
/*joystick capabilties*/
/*z slider sensitivity */
import { zSensBtn, zSenses, inspectArea, sampleArea, joyThumb, joyPad, zThumb, zSlider } from "./drag-pinch-joystick/movInfo";
import { DragObj } from "./drag-pinch-joystick/dragObj";
import { JoystickObj } from "./drag-pinch-joystick/joystickObj";

/*last item in focus*/
let lastFocus: HTMLInputElement = undefined;

/*start btn  initialization */
const liveBtn: HTMLButtonElement = document.querySelector("#live-btn");
const captureBtn: HTMLButtonElement = document.querySelector("#capture-btn");
const stackBtn: HTMLButtonElement = document.querySelector("#stack-btn");

document.body.addEventListener("click", function(e) {
  //remove highlight border only when touching something excluding numpad and selectred parameter
  if (numPad.filter(numBtn => numBtn === e.target).length == 0) {
    if (e.target !== delBtn && e.target !== dotBtn)
      if (UIparameters.filter(param => param === e.target).length == 0) {
        removeHighlithBoder();
        lastFocus = null;
      }
  }
  //set UI parameter value to 0 when empty
  UIparameters.forEach(param => {
    if (param != lastFocus)
      if (param.value == "") {
        param.value = "0";
      }
  });
});

//adds event to slider box for slider movement and on/off button
laserUIBoxes.forEach(laserUIBox => {
  laserUIBox.slider.oninput = () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
  };
  laserUIBox.btn.addEventListener("click", () => {
    laserUIBox.isOn = !laserUIBox.isOn;
    if (laserUIBox.isOn) grayOutLaserBox(laserUIBox);
    else lightUpLaserBox(laserUIBox);
  });
});

/*store last parameters input in focus*/
UIparameters.forEach(param => {
  param.addEventListener("click", () => {
    removeHighlithBoder();
    lastFocus = param;
    param.value = "";
    param.classList.add("highlighted");
    sendParamChange(param);
  });
});

/*add touched num in last focus element*/
numPad.forEach((numBtn, i) => {
  numBtn.addEventListener("click", () => {
    if (lastFocus != null) {
      lastFocus.classList.add("highlighted");
      let lastFocusParamIndex = UIparameters.indexOf(lastFocus);
      console.log(limits[lastFocusParamIndex].max);

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

UIparameters.forEach(param => param.addEventListener("change", () => alert("cambiato")));

//problem
/*add dot to last focus element when dot button pressed */
dotBtn.addEventListener("click", () => {
  if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
    lastFocus.classList.add("highlighted");
    lastFocus.value += ".";
    //  sendParamChange(lastFocus);
  }
});

/*delete number to last focus element when delete button pressed */
delBtn.addEventListener("click", () => {
  if (lastFocus != null) {
    lastFocus.classList.add("highlighted");
    lastFocus.value = lastFocus.value.slice(0, -1); /*remove last character */
    sendParamChange(lastFocus);
  }
});

/*add dragable capabilities*/
let dragObj = new DragObj(inspectArea, sampleArea);

let xyMotor = new JoystickObj(joyThumb, joyPad);
let zMotor = new JoystickObj(zThumb, zSlider);
/*add pinchable capabilities*/
pinchInfos.forEach(info => {
  info.pinchArea.addEventListener("touchstart", pinchStart);
  info.pinchArea.addEventListener("touchmove", pinch);
  info.pinchArea.addEventListener("touchend", pinchEnd);
});
/*
joystickInfos.forEach(info => {
  info.area.addEventListener("touchstart", joyStart);
  info.area.addEventListener("touchmove", joyMove);
  info.area.addEventListener("touchend", joyEnd);
  info.area.addEventListener("mousedown", joyStart);
  info.area.addEventListener("mousemove", joyMove);
  info.area.addEventListener("mouseup", joyEnd);
});
*/
zSensBtn.addEventListener("click", () => {
  zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
});

function removeHighlithBoder() {
  UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

setInterval(getCurrentState, 200);

function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then(newState => {
      newState;
      updateLimits(newState);
      updateUILasers(newState);
      updateUIParameters(newState);
    });
}

function updateUIPads() {}

//incomplete
function sendLaserData(targetWaveLength: number) {
  fetch(`prismState/lasers/${targetWaveLength}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({})
  });
}
