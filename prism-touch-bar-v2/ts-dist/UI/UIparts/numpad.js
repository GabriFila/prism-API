"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainUI_1 = require("../mainUI");
const limits_1 = require("./limits");
const toFromAPI_1 = require("../toFromAPI");
const scanParameteres_1 = require("./scanParameteres");
/*
const btn0: HTMLButtonElement = document.querySelector("#btn0");
const btn1: HTMLButtonElement = document.querySelector("#btn1");
const btn2: HTMLButtonElement = document.querySelector("#btn2");
const btn3: HTMLButtonElement = document.querySelector("#btn3");
const btn4: HTMLButtonElement = document.querySelector("#btn4");
const btn5: HTMLButtonElement = document.querySelector("#btn5");
const btn6: HTMLButtonElement = document.querySelector("#btn6");
const btn7: HTMLButtonElement = document.querySelector("#btn7");
const btn8: HTMLButtonElement = document.querySelector("#btn8");
const btn9: HTMLButtonElement = document.querySelector("#btn9");
*/
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
                if (limits_1.limits.find(limit => limit.id == mainUI_1.lastFocus.id).check(Number(mainUI_1.lastFocus.value) + Number(numBtn.innerHTML))) {
                    mainUI_1.lastFocus.value += Number(numBtn.innerHTML);
                    toFromAPI_1.sendPut(`prismState/${mainUI_1.lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(mainUI_1.lastFocus.value));
                }
                else {
                    mainUI_1.lastFocus.classList.add("limit");
                    setTimeout(() => mainUI_1.lastFocus.classList.remove("limit"), 600);
                }
            }
        });
    });
    function adjustRange() {
        if (Number(scanParameteres_1.offsetX.value) + Number(scanParameteres_1.rangeX.value) > limits_1.limits.find(limit => limit.id == scanParameteres_1.offsetX.id).max)
            scanParameteres_1.rangeX.value = (limits_1.limits.find(limit => limit.id == scanParameteres_1.offsetX.id).max - Number(scanParameteres_1.offsetX.value)).toString();
    }
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
            mainUI_1.lastFocus.value = mainUI_1.lastFocus.value.slice(0, -1); //remove last character
            toFromAPI_1.sendPut(`prismState/${mainUI_1.lastFocus.id.replace("-", "/").replace("-", "/")}`, Number(mainUI_1.lastFocus.value));
        }
    });
}
exports.setUpNumPad = setUpNumPad;
//# sourceMappingURL=numpad.js.map