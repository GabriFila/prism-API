import { ScanParams } from "../../model";

export const offsetX: HTMLInputElement = document.querySelector("#scanParams-offset-x");
export const offsetY: HTMLInputElement = document.querySelector("#scanParams-offset-y");
const pixelNumberX: HTMLInputElement = document.querySelector("#scanParams-pixelNumber-x");
const pixelNumberY: HTMLInputElement = document.querySelector("#scanParams-pixelNumber-y");
const pixelNumberZ: HTMLInputElement = document.querySelector("#scanParams-pixelNumber-z");
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
    (document.getElementById((scanParams as any)[prop].x.name) as HTMLInputElement).value = (scanParams as any)[prop].x.value.toString();
    (document.getElementById((scanParams as any)[prop].y.name) as HTMLInputElement).value = (scanParams as any)[prop].y.value.toString();
    (document.getElementById((scanParams as any)[prop].z.name) as HTMLInputElement).value = (scanParams as any)[prop].z.value.toString();
  });
  (document.getElementById("scanParams-dwellTime") as HTMLInputElement).value = scanParams.dwellTime.value.toString();
}