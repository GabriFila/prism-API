/*mode btns  initialization */
export const liveBtn: HTMLButtonElement = document.querySelector("#live-btn");
export const captureBtn: HTMLButtonElement = document.querySelector("#capture-btn");
export const stackBtn: HTMLButtonElement = document.querySelector("#stack-btn");
export const modeBtns: HTMLButtonElement[] = [liveBtn, captureBtn, stackBtn];

export let currentMode: string;


export function updateMode(newMode: string) {
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
