"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toFromAPI_1 = require("../toFromAPI");
const modeBtns = document.querySelectorAll(".mode-btn");
function setUpModeBtns() {
    // mode btns events
    modeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("highlighted-button")) {
                btn.classList.remove("highlighted-button");
                toFromAPI_1.sendPut("prismState/mode", "stop");
            }
            else {
                modeBtns.forEach(btn => btn.classList.remove("highlighted-button"));
                btn.classList.add("highlighted-button");
                toFromAPI_1.sendPut("prismState/mode", btn.id.split("-")[0]);
            }
        });
    });
}
exports.setUpModeBtns = setUpModeBtns;
//# sourceMappingURL=mode.js.map