"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
exports.limits = [];
const offsetX = document.querySelector("#offset-x");
const offsetY = document.querySelector("#offset-y");
const offsetZ = document.querySelector("#offset-z");
const pixelNumberX = document.querySelector("#pixelNumber-x");
const pixelNumberY = document.querySelector("#pixelNumber-y");
const pixelNumberZ = document.querySelector("#pixelNumber-z");
const rangeX = document.querySelector("#range-x");
const rangeY = document.querySelector("#range-y");
const rangeZ = document.querySelector("#range-z");
const dwellTime = document.querySelector("#dwellTime");
const totalTime = document.querySelector("#totalTime");
exports.UIparameters = [
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
exports.UIparameters.forEach(param => exports.limits.push(new Limit(param.id)));
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
//export const limits: MaxMin[] = [];
function sendParamChange(param) {
    let target = param.id;
    let resource;
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
exports.sendParamChange = sendParamChange;
function sendParamChangeSingle(resource, newValue) {
    fetch(`/prismState/scanParams/${resource}`, {
        method: "PUT",
        body: JSON.stringify({ newValue }),
        headers: {
            "Content-Type": "application/json"
        }
    });
}
exports.sendParamChangeSingle = sendParamChangeSingle;
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