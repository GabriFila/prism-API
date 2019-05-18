/*laser elements*/
//import { laserUIBoxes, grayOutLaserBox, lightUpLaserBox, sendLaserData } from "./UIparts/lasers";
/*numpad element*/
import { numPad, delBtn, dotBtn } from "./UIparts/numpad";
/*parameters elements and methods*/
//import { UIparameters, sendParamChange, limits, sendParamChangeSingle } from "./UIparts/scanParameteres";
/*UI pads,joysticks objects */
import { zSensBtn, zSenses, zThumb, zSlider, joyThumb, inspectArea, sampleArea, joyPad } from "./UIparts/drag-pinch-joystick/movObj";
/*joystick capabilties*/
import { SliderJoystickObj } from "./UIparts/drag-pinch-joystick/sliderJoystickObj";
/*pinch class*/
import { PinchObj } from "./UIparts/drag-pinch-joystick/pinchObj";
/*circular joystick class*/
import { CircJoystickObj } from "./UIparts/drag-pinch-joystick/circJoystick";
/*UI SSE updater*/
import { getCurrentState, sendPut } from "./UIupdater";
import { UIparameters, limits } from "./UIparts/scanParameteres";

/*get microscope state on UI start-up */
const modeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".mode-btn");

// mode btns events

modeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("highlighted-button")) {
      btn.classList.remove("highlighted-button");
      sendPut("prismState/mode", "stop");
    } else {
      modeBtns.forEach(btn => btn.classList.remove("highlighted-button"));
      btn.classList.add("highlighted-button");
      sendPut("prismState/mode", btn.id.split("-")[0]);
    }
  });
});

//last item in focus
let lastFocus: HTMLInputElement = undefined;

//remove highlight border only when touching something excluding numpad and selectred parameter
document.body.addEventListener("click", function(e) {
  if (lastFocus != null) {
    if (numPad.filter(numBtn => numBtn === e.target).length == 0) {
      if (e.target !== delBtn && e.target !== dotBtn)
        if (UIparameters.filter(param => param === e.target).length == 0) {
          removeHighlithBoder();
          sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
          lastFocus = null;
        }
    }
  }
});

//store last parameters input in focus
UIparameters.forEach(param => {
  param.addEventListener("touchstart", () => {
    removeHighlithBoder();
    lastFocus = param;
    param.value = "";
    param.classList.add("highlighted");
  });
});

//add touched num in last focus element
numPad.forEach((numBtn, i) => {
  numBtn.addEventListener("click", () => {
    if (lastFocus != null) {
      lastFocus.classList.add("highlighted");

      if (limits.find(limit => limit.id == lastFocus.id).check(Number(lastFocus.value + i))) {
        lastFocus.value += i;
        sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
      } else {
        lastFocus.classList.add("limit");
        setTimeout(() => lastFocus.classList.remove("limit"), 600);
      }
    }
  });
});

function removeHighlithBoder() {
  UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

getCurrentState();
//setUpUpdater();

/*UI scanning parameters settings */

/*Laser boxes events */

/*adds event to slider box for slider movement and on/off button
laserUIBoxes.forEach(laserUIBox => {
  laserUIBox.slider.addEventListener("input", () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
  });
  laserUIBox.slider.addEventListener("touchend", () => {
    let tempValue = laserUIBox.slider.value;
    laserUIBox.powerLabel.innerHTML = tempValue + "%";
    sendLaserData(laserUIBox);
  });
  laserUIBox.btn.addEventListener("click", () => {
    laserUIBox.isOn = !laserUIBox.isOn;
    if (laserUIBox.isOn) grayOutLaserBox(laserUIBox);
    else lightUpLaserBox(laserUIBox);
    sendLaserData(laserUIBox);
  });
});

/*Numpad events */

/*add dot to last focus element when dot button pressed 
dotBtn.addEventListener("click", () => {
  if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
    lastFocus.classList.add("highlighted");
    lastFocus.value += ".";
  }
});

/*delete number to last focus element when delete button pressed 
delBtn.addEventListener("click", () => {
  if (lastFocus != null) {
    lastFocus.classList.add("highlighted");
    lastFocus.value = lastFocus.value.slice(0, -1); /*remove last character 
    sendParamChange(lastFocus);
  }
});

/*look surface events


/*update own UI parameters
lookSurface.area.addEventListener("touchmove", () => {
  UIparameters[0].value = String((lookSurface.leftRelPos * limits[0].max) / lookSurface.areaWidth);
  UIparameters[1].value = String((lookSurface.topRelPos * limits[1].max) / lookSurface.areaHeight);
  UIparameters[6].value = String((lookSurface.elWidth * limits[6].max) / lookSurface.areaWidth);
  UIparameters[7].value = String((lookSurface.elHeight * limits[7].max) / lookSurface.areaHeight);
});

/*send parameter change when untouched
lookSurface.area.addEventListener("touchend", () => {
  sendParamChangeSingle("offset/x", Number(UIparameters[0].value));
  sendParamChangeSingle("offset/y", Number(UIparameters[1].value));
  sendParamChangeSingle("range/x", Number(UIparameters[6].value));
  sendParamChangeSingle("range/y", Number(UIparameters[7].value));
});

/*motor sliders */

/*joystick initializations
let zMotor = new SliderJoystickObj(zThumb, zSlider);
let xyMotor = new CircJoystickObj(joyThumb, joyPad);

/*change z joystick sensibility when touched 
zSensBtn.addEventListener("click", () => {
  zSensBtn.innerHTML = zSenses[(zSenses.indexOf(zSensBtn.innerHTML) + 1) % zSenses.length];
});

let intervalCheckerXY: NodeJS.Timeout;

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

let intervalCheckerZ: NodeJS.Timeout;

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
  }, 200);
});

zMotor.element.addEventListener("touchend", () => clearInterval(intervalCheckerZ));

*/

export const lookSurface = new PinchObj(inspectArea, sampleArea, 20);
