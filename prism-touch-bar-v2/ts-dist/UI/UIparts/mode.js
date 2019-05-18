"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*mode btns  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
//export const modeBtns: HTMLButtonElement[] = [liveBtn, captureBtn, stackBtn];
exports.modeBtns = document.querySelectorAll(".mode-btn");
/*
function updateMode(newMode: string) {
  currentMode = newMode;
  modeBtns.forEach(btn => btn.classList.remove("highlighted-button"));
  let higlightBtn: HTMLButtonElement;
  switch (currentMode) {
    case "live":
      higlightBtn = liveBtn;
      break;
    case "capture":
      higlightBtn = captureBtn;
      break;
    case "stack":
      higlightBtn = stackBtn;
      break;
    default:
      higlightBtn = null;
      break;
  }
  if (higlightBtn != null) higlightBtn.classList.add("highlighted-button");
}
*/ 
//# sourceMappingURL=mode.js.map