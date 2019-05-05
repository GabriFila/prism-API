/*slider initialization*/
import {
  laserUIBoxes,
  grayOutLaserBox,
  lightUpLaserBox
} from "./initializations/lasers";
/*numpad initialization*/
import { numPad, delBtn, dotBtn } from "./initializations/numpad";
/*parameters initialization*/
import { UIparameters, presetSelector, addPresetBtn, /*presets, Preset,*/ sendParamChange } from "./initializations/scanParameteres";
/*drag capabilties*/
import { dragStart, drag, dragEnd, dragInfos } from "./drag-pinch-joystick/drag";
/*pinch capabilties*/
import { pinchStart, pinch, pinchEnd, pinchInfos } from "./drag-pinch-joystick/pinch";
/*joystick capabilties*/
import { joystickInfos, joyStart, joyMove, joyEnd } from "./drag-pinch-joystick/joystick";
/*z slider sensitivity */
import { zSensBtn, zSenses, inspectArea } from "./drag-pinch-joystick/movInfo";
import { State } from "./initializations/classes";
import { generateKeyPair } from "crypto";

/*last item in focus*/
let lastFocus: HTMLInputElement = undefined;

/*start btn  initialization */
const liveBtn: HTMLButtonElement = document.querySelector("#live-btn");
const captureBtn: HTMLButtonElement = document.querySelector("#capture-btn");
const stackBtn: HTMLButtonElement = document.querySelector("#stack-btn");

let state = new State();

//prepareUI();

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

laserUIBoxes.forEach(laserUIBox => {
  laserUIBox.slider.oninput = () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
    //  state.lasers[i].power = Number(tempValue);
  };
  laserUIBox.btn.addEventListener("click", () => {
    //state.lasers[i].isOn = !state.lasers[i].isOn;
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
      lastFocus.value += i;
      sendParamChange(lastFocus);
    }
  });
});

/*add dot to last focus element when dot button pressed */
dotBtn.addEventListener("click", () => {
  if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
    lastFocus.classList.add("highlighted");
    lastFocus.value += ".";
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
dragInfos.forEach(info => {
  info.area.addEventListener("touchstart", dragStart);
  info.area.addEventListener("touchmove", drag);
  info.area.addEventListener("touchend", dragEnd);
  info.area.addEventListener("mousedown", dragStart);
  info.area.addEventListener("mousemove", drag);
  info.area.addEventListener("mouseup", dragEnd);
});

/*add pinchable capabilities*/
pinchInfos.forEach(info => {
  info.pinchArea.addEventListener("touchstart", pinchStart);
  info.pinchArea.addEventListener("touchmove", pinch);
  info.pinchArea.addEventListener("touchend", pinchEnd);
});

joystickInfos.forEach(info => {
  info.area.addEventListener("touchstart", joyStart);
  info.area.addEventListener("touchmove", joyMove);
  info.area.addEventListener("touchend", joyEnd);
  info.area.addEventListener("mousedown", joyStart);
  info.area.addEventListener("mousemove", joyMove);
  info.area.addEventListener("mouseup", joyEnd);
});

zSensBtn.addEventListener("click", () => {
  zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
});

function removeHighlithBoder() {
  UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

function prepareUI() {
  UIparameters.forEach(parameter => (parameter.value = "0"));

  zSensBtn.innerHTML = zSenses[0];
}

setInterval(getCurrentState, 200);

function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then(newState => (state = newState))
    .then(updateUIParameters)
    .then(updateUILasers);
}

function updateUIParameters() {
  UIparameters[0].value = state.scanParams.offset.x.current.toString();
  UIparameters[1].value = state.scanParams.offset.y.current.toString();
  UIparameters[2].value = state.scanParams.offset.z.current.toString();
  UIparameters[3].value = state.scanParams.pixelNumber.x.current.toString();
  UIparameters[4].value = state.scanParams.pixelNumber.y.current.toString();
  UIparameters[5].value = state.scanParams.pixelNumber.z.current.toString();
  UIparameters[6].value = state.scanParams.range.x.current.toString();
  UIparameters[7].value = state.scanParams.range.y.current.toString();
  UIparameters[8].value = state.scanParams.range.z.current.toString();
  UIparameters[9].value = state.scanParams.dwellTime.toString();
}

function updateUILasers() {
  laserUIBoxes.forEach((laserUIBox, i) => {
    //hide empty lasers
    if (i >= state.lasers.length) laserUIBoxes[i].visible = false;
    else {
      laserUIBoxes[i].powerLabel.innerHTML = state.lasers[i].power.toString() + "%";
      laserUIBoxes[i].slider.value = state.lasers[i].power.toString();
      laserUIBoxes[i].waveLengthLabel.innerHTML = state.lasers[i].waveLength.toString() + "nm";
      if (state.lasers[i].isOn) lightUpLaserBox(laserUIBoxes[i]);
      else grayOutLaserBox(laserUIBoxes[i]);
    }
  });
}

function updateUIPads() {
  dragInfos[0].relPos.left = state.scanParams.offset.x.current;
  dragInfos[0].relPos.top = state.scanParams.offset.y.current;
}

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

function sendScanParam() {}
