import { sendPut } from "../toFromAPI";

const modeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".mode-btn");
export function setUpModeBtns() {
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
}

export function updateModeBtns(newValue: string) {
  modeBtns.forEach(modeBtn => {
    modeBtn.classList.remove("highlighted-button");
    if (newValue != "stop") document.getElementById(`${newValue}-btn`).classList.add("highlighted-button");
  });
}
