import { ScanParams, XYZ } from "../../model";

class MaxMin {
  max: number;
  min: number;
  constructor() {
    this.max = Number.POSITIVE_INFINITY;
    this.min = Number.NEGATIVE_INFINITY;
  }
}
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

let limits: Limit[] = [];

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
console.log(offsetX);

UIparameters.forEach(param => {
  console.log(param);

  limits.push(new Limit(param.id));
});

export const addPresetBtn: HTMLButtonElement = document.querySelector("#add-preset-btn");
export const presetSelector: HTMLSelectElement = document.querySelector("#preset-selector");

//export const limits: MaxMin[] = [];

//fills limits

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

export function updateUIParameters(scanParams: ScanParams) {
  let props = Object.keys(scanParams);
  props
    .filter(prop => {
      let innerProps = Object.keys((scanParams as any)[prop]);
      return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
    .forEach(prop => {
      (document.getElementById((scanParams as any)[prop].x.name) as HTMLInputElement).value = (scanParams as any)[prop].x.value.toString();
      (document.getElementById((scanParams as any)[prop].y.name) as HTMLInputElement).value = (scanParams as any)[prop].y.value.toString();
      (document.getElementById((scanParams as any)[prop].z.name) as HTMLInputElement).value = (scanParams as any)[prop].z.value.toString();
    });
    (document.getElementById("dwellTime")as HTMLInputElement).value = scanParams.dwellTime.value.toString();
  }

export function updateLimits(scanParams: ScanParams) {
  let props = Object.keys(scanParams);
  props
    .filter(prop => {
      let innerProps = Object.keys((scanParams as any)[prop]);
      return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
    .forEach(prop => {
      limits.find(limit => limit.id == (scanParams as any)[prop].x.name).max = (scanParams as any)[prop].x.max;
      limits.find(limit => limit.id == (scanParams as any)[prop].x.name).min = (scanParams as any)[prop].x.min;

      limits.find(limit => limit.id == (scanParams as any)[prop].y.name).max = (scanParams as any)[prop].y.max;
      limits.find(limit => limit.id == (scanParams as any)[prop].y.name).min = (scanParams as any)[prop].y.min;

      limits.find(limit => limit.id == (scanParams as any)[prop].z.name).max = (scanParams as any)[prop].z.max;
      limits.find(limit => limit.id == (scanParams as any)[prop].z.name).min = (scanParams as any)[prop].z.min;
    });
  limits.find(limit => limit.id == "dwellTime").max = scanParams.dwellTime.max;

  /*
  limits[0].max = scanParams.offset.x.max;
  limits[0].min = scanParams.offset.x.min;
  limits[1].max = scanParams.offset.y.max;
  limits[1].min = scanParams.offset.y.min;
  limits[2].max = scanParams.offset.z.max;
  limits[2].min = scanParams.offset.z.min;

  limits[3].max = scanParams.pixelNumber.x.max;
  limits[3].min = scanParams.pixelNumber.x.min;
  limits[4].max = scanParams.pixelNumber.y.max;
  limits[4].min = scanParams.pixelNumber.y.min;
  limits[5].max = scanParams.pixelNumber.z.max;
  limits[5].min = scanParams.pixelNumber.z.min;

  limits[6].max = scanParams.range.x.max;
  limits[6].min = scanParams.range.x.min;
  limits[7].max = scanParams.range.y.max;
  limits[7].min = scanParams.range.y.min;
  limits[8].max = scanParams.range.z.max;
  limits[8].min = scanParams.range.z.min;
  */
  console.log("limit: ");

  console.log(limits);
}
