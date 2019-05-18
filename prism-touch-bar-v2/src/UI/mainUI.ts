/*numpad element*/
import { numPad, delBtn, dotBtn } from "./UIparts/numpad";
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
import { laserUIRows } from "./UIparts/lasers";
import { Z_STREAM_END } from "zlib";

/*get microscope state on UI start-up */
const modeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".mode-btn");

getCurrentState();

//setUpUpdater();
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

/*UI scanning parameters settings */

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

function removeHighlithBoder() {
  UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}

//adds event to slider box for slider movement and on/off button
laserUIRows.forEach(laserUIRow => {
  laserUIRow.slider.addEventListener("input", () => {
    let tempValue = laserUIRow.slider.value;
    laserUIRow.powerLabel.innerHTML = tempValue + "%";
  });
  laserUIRow.slider.addEventListener("touchend", () => {
    let tempValue = laserUIRow.slider.value;
    laserUIRow.powerLabel.innerHTML = tempValue + "%";
    sendPut(`prismState/lasers/power?waveLength=${laserUIRow.waveLength}`, Number(laserUIRow.power));
  });

  laserUIRow.btn.addEventListener("click", () => {
    laserUIRow.isOn = !laserUIRow.isOn;
    sendPut(`prismState/lasers/isOn?waveLength=${laserUIRow.waveLength}`, laserUIRow.isOn);
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

/*Numpad events */
//add dot to last focus element when dot button pressed
dotBtn.addEventListener("click", () => {
  if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
    lastFocus.classList.add("highlighted");
    lastFocus.value += ".";
  }
});

//delete number to last focus element when delete button pressed
delBtn.addEventListener("click", () => {
  if (lastFocus != null) {
    lastFocus.classList.add("highlighted");
    lastFocus.value = lastFocus.value.slice(0, -1); //remove last character
    sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
  }
});

//look surface events
export const lookSurface = new PinchObj(inspectArea, sampleArea, 20);

//update own UI parameters
lookSurface.area.addEventListener("touchmove", () => {
  (document.getElementById("scanParams-offset-x") as HTMLInputElement).value = String(
    (lookSurface.leftRelPos * limits.find(limit => limit.id == "scanParams-offset-x").max) / lookSurface.areaWidth
  );

  (document.getElementById("scanParams-offset-y") as HTMLInputElement).value = String(
    (lookSurface.topRelPos * limits.find(limit => limit.id == "scanParams-offset-y").max) / lookSurface.areaHeight
  );
  (document.getElementById("scanParams-range-x") as HTMLInputElement).value = String(
    (lookSurface.elWidth * limits.find(limit => limit.id == "scanParams-range-x").max) / lookSurface.areaWidth
  );
  (document.getElementById("scanParams-range-y") as HTMLInputElement).value = String(
    (lookSurface.elHeight * limits.find(limit => limit.id == "scanParams-range-y").max) / lookSurface.areaHeight
  );
});
//send parameter change when untouched
lookSurface.area.addEventListener("touchend", () => {
  sendPut("prismState/scanParams/offset/x", Number((document.getElementById("scanParams-offset-x") as HTMLInputElement).value));
  sendPut("prismState/scanParams/offset/y", Number((document.getElementById("scanParams-offset-x") as HTMLInputElement).value));
  sendPut("prismState/scanParams/range/x", Number((document.getElementById("scanParams-range-x") as HTMLInputElement).value));
  sendPut("prismState/scanParams/range/y", Number((document.getElementById("scanParams-range-y") as HTMLInputElement).value));
});

/*motor sliders */

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
