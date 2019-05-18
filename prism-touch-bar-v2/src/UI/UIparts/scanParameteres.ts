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

const tempUIparams: NodeListOf<HTMLInputElement> = document.querySelectorAll(".param-input");
export const UIparameters: HTMLInputElement[] = [];
//remove grayed out elemts from tempUIparameters
tempUIparams.forEach(param => {
  if (!param.classList.contains("grayed-out")) {
    UIparameters.push(param);
  }
});

//initialize limit array
export const limits: Limit[] = [];
UIparameters.forEach(param => limits.push(new Limit(param.id)));

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
