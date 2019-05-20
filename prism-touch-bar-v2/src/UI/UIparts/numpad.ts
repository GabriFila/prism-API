import { lastFocus } from "../mainUI";
//import { limits } from "./limits";
import { changeScanParam } from "./scanParameteres";

export const dotBtn: HTMLButtonElement = document.querySelector("#btnDot");
export const delBtn: HTMLButtonElement = document.querySelector("#btnDel");

//export const numPad = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];

const tempNumPad: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".num-btn");
//convert numpad list to array to make filtering possible
export const numPad: HTMLButtonElement[] = [];
tempNumPad.forEach(btn => numPad.push(btn));

export function setUpNumPad() {
  numPad.forEach(numBtn => {
    numBtn.addEventListener("click", () => {
      if (lastFocus != null) {
        lastFocus.classList.add("highlighted");
        changeScanParam(lastFocus.id, numPadClick(lastFocus,Number(numBtn.innerHTML)))// Number(lastFocus.value) * 10 + Number(numBtn.innerHTML));
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
      changeScanParam(lastFocus.id, lastFocus.value.slice(0, -1));
    }
  });
}

function numPadClick(el: HTMLInputElement, input: number): number {
  if (el.value.includes(".")) return Number(el.value + `${input}`);
  else return Number(el.value) * 10 + input;
}
