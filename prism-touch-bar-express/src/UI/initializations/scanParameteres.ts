import { translateToUI, inspectArea } from "../drag-pinch-joystick/movInfo";

/*
export class Preset {
    name: string;
    param: ParamState;
    constructor(name: string, param: ParamState) {
        this.name = name;
        this.param = param;
    }
}
*/
//export const presets: Preset[] = [];

const offsetX: HTMLInputElement = document.querySelector("#offset-X");
const offsetY: HTMLInputElement = document.querySelector("#offset-Y");
const offsetZ: HTMLInputElement = document.querySelector("#offset-Z");
const pixelNumberX: HTMLInputElement = document.querySelector("#pixel-number-X");
const pixelNumberY: HTMLInputElement = document.querySelector("#pixel-number-Y");
const pixelNumberZ: HTMLInputElement = document.querySelector("#pixel-number-Z");
const rangeX: HTMLInputElement = document.querySelector("#range-X");
const rangeY: HTMLInputElement = document.querySelector("#range-Y");
const rangeZ: HTMLInputElement = document.querySelector("#range-Z");
const dwellTime: HTMLInputElement = document.querySelector("#dwell-time");
const totalTime: HTMLInputElement = document.querySelector("#total-time");

export const parameters: HTMLInputElement[] = [
  offsetX,
  offsetY,
  offsetZ,
  pixelNumberX,
  pixelNumberY,
  pixelNumberZ,
  rangeX,
  rangeY,
  rangeZ,
  dwellTime
];

export const addPresetBtn: HTMLButtonElement = document.querySelector("#add-preset-btn");
export const presetSelector: HTMLSelectElement = document.querySelector("#preset-selector");

export function sendParamChange(input: HTMLInputElement) {
  let resource: string;

  switch (input) {
    case parameters[0]:
      resource = "offset/X";
      break;
    case parameters[1]:
      resource = "offset/Y";
      break;
    case parameters[2]:
      resource = "offset/Z";
      break;
    case parameters[3]:
      resource = "pix-num/X";
      break;
    case parameters[4]:
      resource = "pix-num/Y";
      break;
    case parameters[5]:
      resource = "pix-num/Z";
      break;
    case parameters[6]:
      resource = "range/X";
      break;
    case parameters[7]:
      resource = "range/Y";
      break;
    case parameters[8]:
      resource = "range/Z";
      break;
    case parameters[9]:
      resource = "time";
      break;
  }
  let msg = {
    title: "messaggio",
    testo: "testo del messaggio"
  };

  fetch("/prism-state/scan-param/" + resource, {
    method: "PUT",
    body: JSON.stringify(msg),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
}
