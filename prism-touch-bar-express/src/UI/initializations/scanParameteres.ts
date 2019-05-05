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

export const UIparameters: HTMLInputElement[] = [
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
  let target: string = input.id;
  let resource: string;

  console.log("send param change");

  switch (target) {
    case "offset-X":
      resource = "offset/X";
      break;
    case "offset-Y":
      resource = "offset/Y";
      break;
    case "offset-Z":
      resource = "offset/Z";
      break;
    case "pixel-number-X":
      resource = "pixelNumber/X";
      break;
    case "pixel-number-Y":
      resource = "pixelNumber/Y";
      break;
    case "pixel-number-Z":
      resource = "pixelNumber/Z";
      break;
    case "range-X":
      resource = "range/X";
      break;
    case "range-Y":
      resource = "range/Y";
      break;
    case "range-Z":
      resource = "range/Z";
      break;
    case "dwell-time":
      resource = "dwellTime";
      break;
  }
  console.log(
    JSON.stringify({
      newValue: Number(input.value)
    })
  );

  fetch("/prismState/scanParams/" + resource, {
    method: "PUT",
    body: JSON.stringify({
      newValue: Number(input.value)
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(body => console.log(body));
}
