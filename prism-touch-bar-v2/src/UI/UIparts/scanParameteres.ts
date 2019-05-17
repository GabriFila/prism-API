import { ScanParams } from "../../model";

class Limit {
  id: string;
  max: number;
  min: number;
  constructor(id: string) {
    this.id = id;
    this.max = Number.POSITIVE_INFINITY;
    this.min = Number.NEGATIVE_INFINITY;
  }
}

export const limits: Limit[] = [];

const offsetX: HTMLInputElement = document.querySelector("#offset-x");
const offsetY: HTMLInputElement = document.querySelector("#offset-y");
const offsetZ: HTMLInputElement = document.querySelector("#offset-z");
const pixelNumberX: HTMLInputElement = document.querySelector("#pixelNumber-x");
const pixelNumberY: HTMLInputElement = document.querySelector("#pixelNumber-y");
const pixelNumberZ: HTMLInputElement = document.querySelector("#pixelNumber-z");
const rangeX: HTMLInputElement = document.querySelector("#range-x");
const rangeY: HTMLInputElement = document.querySelector("#range-y");
const rangeZ: HTMLInputElement = document.querySelector("#range-z");
const dwellTime: HTMLInputElement = document.querySelector("#dwellTime");
const totalTime: HTMLInputElement = document.querySelector("#totalTime");

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

//initialize limit array
UIparameters.forEach(param => limits.push(new Limit(param.id)));

export const addPresetBtn: HTMLButtonElement = document.querySelector("#add-preset-btn");
export const presetSelector: HTMLSelectElement = document.querySelector("#preset-selector");

//export const limits: MaxMin[] = [];


export function sendParamChange(param: HTMLInputElement) {
  let target: string = param.id;
  let resource: string;
  let dim = "offset";
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

  fetch("/prismState/scanParams/" + resource, {
    method: "PUT",
    body: JSON.stringify({
      newValue: Number(param.value)
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
}

export function sendParamChangeSingle(resource: string, newValue: number) {
  fetch(`/prismState/scanParams/${resource}`, {
    method: "PUT",
    body: JSON.stringify({ newValue }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

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
