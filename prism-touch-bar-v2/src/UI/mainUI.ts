/*numpad element*/
import { numPad, delBtn, dotBtn, setUpNumPad } from "./UIparts/numpad";
import { getCurrentMicroState, sendPut, setUpUpdater } from "./toFromAPI";
import { UIparameters } from "./UIparts/scanParameteres";
import { setUpModeBtns } from "./mode";
import { setUpMotorsControls } from "./UIparts/motorsControls";
import { setUpLookSurface } from "./UIparts/lookSurface";
import { setUpLasers } from "./UIparts/lasers";

/*get microscope state on UI start-up */

getCurrentMicroState();

setUpUpdater();

setUpModeBtns();

setUpLasers();

setUpNumPad();

setUpLookSurface();

setUpMotorsControls();

//last item in focus
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

//setting up scanning parameters
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
