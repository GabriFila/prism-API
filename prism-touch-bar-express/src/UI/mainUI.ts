/*slider initialization*/
import { laserUIBoxes, grayOutLaserBox, lightUpLaserBox, updateUILasers, sendLaserData } from "./UIparts/lasers";
/*numpad initialization*/
import { numPad, delBtn, dotBtn } from "./UIparts/numpad";
/*parameters initialization*/
import { UIparameters, sendParamChange, updateUIParameters, updateLimits, limits } from "./UIparts/scanParameteres";
/*drag capabilties*/
import { DragObj } from "./UIparts/drag-pinch-joystick/dragObj";
/*joystick capabilties*/
import { JoystickObj } from "./UIparts/drag-pinch-joystick/joystickObj";
/*pinch capabilties*/
import { PinchObj } from "./UIparts/drag-pinch-joystick/pinchObj";
/*z slider sensitivity */
import { zSensBtn, zSenses, zThumb, zSlider, joyThumb, inspectArea, sampleArea, joyPad } from "./UIparts/drag-pinch-joystick/movObj";
import { State } from "./UIparts/classes";

/*last item in focus*/
let lastFocus: HTMLInputElement = undefined;

/*start btn  initialization */
const liveBtn: HTMLButtonElement = document.querySelector("#live-btn");
const captureBtn: HTMLButtonElement = document.querySelector("#capture-btn");
const stackBtn: HTMLButtonElement = document.querySelector("#stack-btn");

document.body.addEventListener("click", function(e) {
  //remove highlight border only when touching something excluding numpad and selectred parameter
  if (lastFocus != null) {
    if (numPad.filter(numBtn => numBtn === e.target).length == 0) {
      if (e.target !== delBtn && e.target !== dotBtn)
        if (UIparameters.filter(param => param === e.target).length == 0) {
          removeHighlithBoder();
          sendParamChange(lastFocus);
          lastFocus = null;
        }
    }
  }
});

//adds event to slider box for slider movement and on/off button
laserUIBoxes.forEach(laserUIBox => {
  laserUIBox.slider.oninput = () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
    sendLaserData(laserUIBox);
  };
  laserUIBox.btn.addEventListener("click", () => {
    laserUIBox.isOn = !laserUIBox.isOn;
    if (laserUIBox.isOn) grayOutLaserBox(laserUIBox);
    else lightUpLaserBox(laserUIBox);
    sendLaserData(laserUIBox);
  });
});

/*store last parameters input in focus*/
UIparameters.forEach(param => {
  param.addEventListener("touchstart", () => {
    removeHighlithBoder();
    lastFocus = param;
    param.value = "";
    param.classList.add("highlighted");
    //sendParamChange(param);
  });
});

/*add touched num in last focus element*/
numPad.forEach((numBtn, i) => {
  numBtn.addEventListener("click", () => {
    if (lastFocus != null) {
      lastFocus.classList.add("highlighted");
      let lastFocusParamIndex = UIparameters.indexOf(lastFocus);

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
//let lookSurface = new DragObj(inspectArea, sampleArea);
let lookSurface = new PinchObj(inspectArea, sampleArea, 20);

/*add joystick capabilities*/
let xyMotor = new JoystickObj(joyThumb, joyPad);
let zMotor = new JoystickObj(zThumb, zSlider);

zSensBtn.addEventListener("click", () => {
  zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
});

function removeHighlithBoder() {
  UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

//setInterval(getCurrentState, 200);
getCurrentState();

function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then(newState => {
      newState;
      updateLimits(newState);
      updateUILasers(newState);
      updateUIParameters(newState);
     // updateUIPads(newState);
    });
}

function updateUIPads(newState : State) {
  lookSurface.leftRelPos = newState.scanParams.offset.x.current;
  lookSurface.topRelPos = newState.scanParams.offset.y.current;
}

const source = new EventSource("/updates");

source.addEventListener("state-updated", (event: any) => {
  let newState: State = JSON.parse(event.data);

  updateLimits(newState);
  updateUILasers(newState);
  updateUIParameters(newState);
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