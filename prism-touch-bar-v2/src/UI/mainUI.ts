import { UIparameters } from "./mainUIparts/scanParameteres";
import { getCurrentMicroState, sendPut, setUpUpdater } from "./mainUIparts/toFromAPI";
import { setUpModeBtns } from "./mainUIparts/mode";
import { setUpMotorsControls } from "./mainUIparts/motorsControls";
import { setUpLookSurface } from "./mainUIparts/scanArea";
import { setUpLasers } from "./mainUIparts/lasers";
import { numPad, delBtn, dotBtn, setUpNumPad } from "./mainUIparts/numpad";

//get microscope state on UI start-up 
getCurrentMicroState();

//set up SSE events
setUpUpdater();

//set up various part of UI
setUpModeBtns();

setUpLasers();

setUpNumPad();

setUpLookSurface();

setUpMotorsControls();

//last item in focus for right element highlithing
export let lastFocus: HTMLInputElement = undefined;

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
