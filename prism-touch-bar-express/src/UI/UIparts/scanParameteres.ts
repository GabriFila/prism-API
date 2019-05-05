import { State } from "./classes";

class MaxMin {
  max: number;
  min: number;
  constructor() {
    this.max = Number.POSITIVE_INFINITY;
    this.min = Number.NEGATIVE_INFINITY;
  }
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

export const limits: MaxMin[] = [];

//fills limits
UIparameters.forEach(() => limits.push(new MaxMin()));

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

export function updateUIParameters(state: State) {
  UIparameters[0].value = state.scanParams.offset.x.current.toString();
  UIparameters[1].value = state.scanParams.offset.y.current.toString();
  UIparameters[2].value = state.scanParams.offset.z.current.toString();
  UIparameters[3].value = state.scanParams.pixelNumber.x.current.toString();
  UIparameters[4].value = state.scanParams.pixelNumber.y.current.toString();
  UIparameters[5].value = state.scanParams.pixelNumber.z.current.toString();
  UIparameters[6].value = state.scanParams.range.x.current.toString();
  UIparameters[7].value = state.scanParams.range.y.current.toString();
  UIparameters[8].value = state.scanParams.range.z.current.toString();
  UIparameters[9].value = state.scanParams.dwellTime.toString();
}

export function updateLimits(newState: State) {
  limits[0].max = newState.scanParams.offset.x.max;
  limits[0].min = newState.scanParams.offset.x.min;
  limits[1].max = newState.scanParams.offset.y.max;
  limits[1].min = newState.scanParams.offset.y.min;
  limits[2].max = newState.scanParams.offset.z.max;
  limits[2].min = newState.scanParams.offset.z.min;

  limits[3].max = newState.scanParams.pixelNumber.x.max;
  limits[3].min = newState.scanParams.pixelNumber.x.min;
  limits[4].max = newState.scanParams.pixelNumber.y.max;
  limits[4].min = newState.scanParams.pixelNumber.y.min;
  limits[5].max = newState.scanParams.pixelNumber.z.max;
  limits[5].min = newState.scanParams.pixelNumber.z.min;

  limits[6].max = newState.scanParams.range.x.max;
  limits[6].min = newState.scanParams.range.x.min;
  limits[7].max = newState.scanParams.range.y.max;
  limits[7].min = newState.scanParams.range.y.min;
  limits[8].max = newState.scanParams.range.z.max;
  limits[8].min = newState.scanParams.range.z.min;
}
