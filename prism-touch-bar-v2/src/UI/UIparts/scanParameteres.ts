import { ScanParams, XYZ } from "../../model";
import { sendPut } from "../toFromAPI";
import { adatapLookSurface } from "./scanArea";

class Limit {
  id: string;
  max: number;
  min: number;
  constructor(id: string) {
    this.id = id;
    this.max = Number.POSITIVE_INFINITY;
    this.min = Number.NEGATIVE_INFINITY;
  }

  check(value: number): boolean {
    return value <= this.max && value >= this.min;
  }
}

export const offsetX: HTMLInputElement = document.querySelector("#scanParams-offset-x");
export const offsetY: HTMLInputElement = document.querySelector("#scanParams-offset-y");
const pixelNumberX: HTMLInputElement = document.querySelector("#scanParams-pixelNumber-x");
const pixelNumberY: HTMLInputElement = document.querySelector("#scanParams-pixelNumber-y");
const pixelNumberZ: HTMLInputElement = document.querySelector("#scanParams-pixelNumber-z");
const pixelSizeX: HTMLInputElement = document.querySelector("#scanParams-pixelSize-x");
const pixelSizeY: HTMLInputElement = document.querySelector("#scanParams-pixelSize-y");
const pixelSizeZ: HTMLInputElement = document.querySelector("#scanParams-pixelSize-z");
export const rangeX: HTMLInputElement = document.querySelector("#scanParams-range-x");
export const rangeY: HTMLInputElement = document.querySelector("#scanParams-range-y");
const rangeZ: HTMLInputElement = document.querySelector("#scanParams-range-z");
const dwellTime: HTMLInputElement = document.querySelector("#scanParams-dwellTime");
const totalTime: HTMLInputElement = document.querySelector("#scanParams-totalTime");

const tempUIparams: NodeListOf<HTMLInputElement> = document.querySelectorAll(".param-input");

export const UIparameters: HTMLInputElement[] = [];
//remove grayed out elemts from tempUIparameters
tempUIparams.forEach(param => {
  if (!param.classList.contains("grayed-out")) {
    UIparameters.push(param);
  }
});

//initialize limit array

export const addPresetBtn: HTMLButtonElement = document.querySelector("#add-preset-btn");
export const presetSelector: HTMLSelectElement = document.querySelector("#preset-selector");

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

export function getXYZproperties(scanParams: ScanParams): string[] {
  let props = Object.keys(scanParams);
  return props.filter(prop => {
    let innerProps = Object.keys((scanParams as any)[prop]);
    return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
  });
}

export function updateUIParameters(scanParams: ScanParams) {
  getXYZproperties(scanParams).forEach(prop => {
    changeScanParam((scanParams[prop] as XYZ).x.id, (scanParams[prop] as XYZ).x.value as number);
    changeScanParam((scanParams[prop] as XYZ).y.id, (scanParams[prop] as XYZ).y.value as number);
    changeScanParam((scanParams[prop] as XYZ).z.id, (scanParams[prop] as XYZ).z.value as number);
  });
  (document.getElementById("scanParams-dwellTime") as HTMLInputElement).value = scanParams.dwellTime.value.toString();
}

export function changeScanParam(id: string, value: string | number, sendPUT: boolean = true) {
  let el: HTMLInputElement = document.querySelector(`#${id}`);

  if (limits.find(limit => limit.id == id).check(Number(value))) {
    el.value = value.toString();

    if (Number(offsetX.value) + Number(rangeX.value) > limits.find(limit => limit.id == offsetX.id).max) {
      rangeX.value = (limits.find(limit => limit.id == offsetX.id).max - Number(offsetX.value)).toString();
      if (sendPUT) sendPut(`prismState/scanParams/range/x`, Number(rangeX.value));
    }
    if (Number(offsetY.value) + Number(rangeY.value) > limits.find(limit => limit.id == offsetY.id).max) {
      rangeY.value = (limits.find(limit => limit.id == offsetY.id).max - Number(offsetY.value)).toString();
      if (sendPUT) sendPut(`prismState/scanParams/range/y`, Number(rangeY.value));
    }
    if (sendPUT) sendPut(`prismState/${id.replace("-", "/").replace("-", "/")}`, Number(el.value));

    pixelSizeX.value = (Number(rangeX.value) / Number(pixelNumberX.value)).toString();
    pixelSizeY.value = (Number(rangeY.value) / Number(pixelNumberY.value)).toString();
    pixelSizeZ.value = (Number(rangeZ.value) / Number(pixelNumberZ.value)).toString();

    totalTime.value = (
      Number(dwellTime.value) *
      (Number(pixelNumberX.value) + Number(pixelNumberY.value) + Number(pixelNumberZ.value))
    ).toString();


  } else {
    let tempElLimit = el;
    tempElLimit.classList.add("limit");
    setTimeout(() => tempElLimit.classList.remove("limit"), 600);
  }
}

//limit properties

export const limits: Limit[] = [];
UIparameters.forEach(param => limits.push(new Limit(param.id)));

export function updateLimits(scanParams: ScanParams) {
  getXYZproperties(scanParams).forEach(prop => {
    //updates limit for each scanParam that as xyz
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).x.id).max = (scanParams[prop] as XYZ).x.max;
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).x.id).min = (scanParams[prop] as XYZ).x.min;

    limits.find(limit => limit.id == (scanParams[prop] as XYZ).y.id).max = (scanParams[prop] as XYZ).y.max;
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).y.id).min = (scanParams[prop] as XYZ).y.min;

    limits.find(limit => limit.id == (scanParams[prop] as XYZ).z.id).max = (scanParams[prop] as XYZ).z.max;
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).z.id).min = (scanParams[prop] as XYZ).z.min;
  });

  limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
