"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*laser elements*/
//import { laserUIBoxes, grayOutLaserBox, lightUpLaserBox, sendLaserData } from "./UIparts/lasers";
/*numpad element*/
const numpad_1 = require("./UIparts/numpad");
/*parameters elements and methods*/
//import { UIparameters, sendParamChange, limits, sendParamChangeSingle } from "./UIparts/scanParameteres";
/*UI pads,joysticks objects */
const movObj_1 = require("./UIparts/drag-pinch-joystick/movObj");
/*pinch class*/
const pinchObj_1 = require("./UIparts/drag-pinch-joystick/pinchObj");
/*UI SSE updater*/
const UIupdater_1 = require("./UIupdater");
const scanParameteres_1 = require("./UIparts/scanParameteres");
/*get microscope state on UI start-up */
const modeBtns = document.querySelectorAll(".mode-btn");
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
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
UIupdater_1.getCurrentState();
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
exports.lookSurface = new pinchObj_1.PinchObj(movObj_1.inspectArea, movObj_1.sampleArea, 20);
//# sourceMappingURL=mainUI.js.map