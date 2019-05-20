"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainUI_1 = require("../mainUI");
const scanParameteres_1 = require("./scanParameteres");
exports.dotBtn = document.querySelector("#btnDot");
exports.delBtn = document.querySelector("#btnDel");
//export const numPad = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];
const tempNumPad = document.querySelectorAll(".numpad-btn");
//convert numpad list to array to make filtering possible
exports.numPad = [];
tempNumPad.forEach(btn => exports.numPad.push(btn));
function setUpNumPad() {
    exports.numPad.forEach(numBtn => {
        numBtn.addEventListener("click", () => {
            if (mainUI_1.lastFocus != null) {
                mainUI_1.lastFocus.classList.add("highlighted");
                scanParameteres_1.changeScanParam(mainUI_1.lastFocus.id, Number(mainUI_1.lastFocus.value + numBtn.innerHTML));
                /*
                if (limits.find(limit => limit.id == lastFocus.id).check(Number(lastFocus.value) + Number(numBtn.innerHTML))) {
                  changeScanParam(lastFocus.id, (lastFocus.value += Number(numBtn.innerHTML)));
                } else {
                  lastFocus.classList.add("limit");
                  setTimeout(() => lastFocus.classList.remove("limit"), 600);
                }
                */
            }
        });
    });
    /*Numpad events */
    //add dot to last focus element when dot button pressed
    exports.dotBtn.addEventListener("click", () => {
        if (mainUI_1.lastFocus !== null && mainUI_1.lastFocus.value.slice(-1) !== "." && mainUI_1.lastFocus.value.length != 0) {
            mainUI_1.lastFocus.classList.add("highlighted");
            mainUI_1.lastFocus.value += ".";
        }
    });
    //delete number to last focus element when delete button pressed
    exports.delBtn.addEventListener("click", () => {
        if (mainUI_1.lastFocus != null) {
            mainUI_1.lastFocus.classList.add("highlighted");
            scanParameteres_1.changeScanParam(mainUI_1.lastFocus.id, mainUI_1.lastFocus.value.slice(0, -1));
            //lastFocus.value = lastFocus.value.slice(0, -1); //remove last character
            //sendPut(`prismState/${lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(lastFocus.value));
        }
    });
}
exports.setUpNumPad = setUpNumPad;
//# sourceMappingURL=numpad.js.map