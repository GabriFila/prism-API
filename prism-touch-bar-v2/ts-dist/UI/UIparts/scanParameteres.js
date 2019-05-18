"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
    check(value) {
        console.log("value: " + value);
        console.log("max: " + this.max);
        console.log("min: " + this.min);
        console.log("check: " + (value <= this.max && value >= this.min));
        return value <= this.max && value >= this.min;
    }
}
const tempUIparams = document.querySelectorAll(".param-input");
exports.UIparameters = [];
//remove grayed out elemts from tempUIparameters
tempUIparams.forEach(param => {
    if (!param.classList.contains("grayed-out")) {
        exports.UIparameters.push(param);
    }
});
//initialize limit array
exports.limits = [];
exports.UIparameters.forEach(param => exports.limits.push(new Limit(param.id)));
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
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
//# sourceMappingURL=scanParameteres.js.map