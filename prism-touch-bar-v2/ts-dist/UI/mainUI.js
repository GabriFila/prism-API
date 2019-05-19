"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*numpad element*/
const numpad_1 = require("./UIparts/numpad");
const toFromAPI_1 = require("./toFromAPI");
const scanParameteres_1 = require("./UIparts/scanParameteres");
const mode_1 = require("./UIparts/mode");
const motorsControls_1 = require("./UIparts/motorsControls");
const lookSurface_1 = require("./UIparts/lookSurface");
const lasers_1 = require("./UIparts/lasers");
/*get microscope state on UI start-up */
toFromAPI_1.getCurrentMicroState();
toFromAPI_1.setUpUpdater();
mode_1.setUpModeBtns();
lasers_1.setUpLasers();
numpad_1.setUpNumPad();
lookSurface_1.setUpLookSurface();
motorsControls_1.setUpMotorsControls();
//last item in focus
exports.lastFocus = undefined;
//remove highlight border only when touching something excluding numpad and selectred parameter
document.body.addEventListener("click", function (e) {
    if (exports.lastFocus != null) {
        if (numpad_1.numPad.filter(numBtn => numBtn === e.target).length == 0) {
            if (e.target !== numpad_1.delBtn && e.target !== numpad_1.dotBtn)
                if (scanParameteres_1.UIparameters.filter(param => param === e.target).length == 0) {
                    removeHighlithBoder();
                    toFromAPI_1.sendPut(`prismState/${exports.lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(exports.lastFocus.value));
                    exports.lastFocus = null;
                }
        }
    }
});
//setting up scanning parameters
//store last parameters input in focus
scanParameteres_1.UIparameters.forEach(param => {
    param.addEventListener("touchstart", () => {
        removeHighlithBoder();
        exports.lastFocus = param;
        param.value = "";
        param.classList.add("highlighted");
    });
});
function removeHighlithBoder() {
    scanParameteres_1.UIparameters.filter(param => param.classList.contains("highlighted")).forEach(param => param.classList.remove("highlighted"));
}
//# sourceMappingURL=mainUI.js.map