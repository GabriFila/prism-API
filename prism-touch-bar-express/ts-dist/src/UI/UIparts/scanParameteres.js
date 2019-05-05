"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaxMin {
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
const offsetX = document.querySelector("#offset-X");
const offsetY = document.querySelector("#offset-Y");
const offsetZ = document.querySelector("#offset-Z");
const pixelNumberX = document.querySelector("#pixel-number-X");
const pixelNumberY = document.querySelector("#pixel-number-Y");
const pixelNumberZ = document.querySelector("#pixel-number-Z");
const rangeX = document.querySelector("#range-X");
const rangeY = document.querySelector("#range-Y");
const rangeZ = document.querySelector("#range-Z");
const dwellTime = document.querySelector("#dwell-time");
const totalTime = document.querySelector("#total-time");
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
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
exports.limits = [];
//fills limits
exports.UIparameters.forEach(() => exports.limits.push(new MaxMin()));
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
function updateUIParameters(state) {
    exports.UIparameters[0].value = state.scanParams.offset.x.current.toString();
    exports.UIparameters[1].value = state.scanParams.offset.y.current.toString();
    exports.UIparameters[2].value = state.scanParams.offset.z.current.toString();
    exports.UIparameters[3].value = state.scanParams.pixelNumber.x.current.toString();
    exports.UIparameters[4].value = state.scanParams.pixelNumber.y.current.toString();
    exports.UIparameters[5].value = state.scanParams.pixelNumber.z.current.toString();
    exports.UIparameters[6].value = state.scanParams.range.x.current.toString();
    exports.UIparameters[7].value = state.scanParams.range.y.current.toString();
    exports.UIparameters[8].value = state.scanParams.range.z.current.toString();
    exports.UIparameters[9].value = state.scanParams.dwellTime.toString();
}
exports.updateUIParameters = updateUIParameters;
function updateLimits(newState) {
    exports.limits[0].max = newState.scanParams.offset.x.max;
    exports.limits[0].min = newState.scanParams.offset.x.min;
    exports.limits[1].max = newState.scanParams.offset.y.max;
    exports.limits[1].min = newState.scanParams.offset.y.min;
    exports.limits[2].max = newState.scanParams.offset.z.max;
    exports.limits[2].min = newState.scanParams.offset.z.min;
    exports.limits[3].max = newState.scanParams.pixelNumber.x.max;
    exports.limits[3].min = newState.scanParams.pixelNumber.x.min;
    exports.limits[4].max = newState.scanParams.pixelNumber.y.max;
    exports.limits[4].min = newState.scanParams.pixelNumber.y.min;
    exports.limits[5].max = newState.scanParams.pixelNumber.z.max;
    exports.limits[5].min = newState.scanParams.pixelNumber.z.min;
    exports.limits[6].max = newState.scanParams.range.x.max;
    exports.limits[6].min = newState.scanParams.range.x.min;
    exports.limits[7].max = newState.scanParams.range.y.max;
    exports.limits[7].min = newState.scanParams.range.y.min;
    exports.limits[8].max = newState.scanParams.range.z.max;
    exports.limits[8].min = newState.scanParams.range.z.min;
}
exports.updateLimits = updateLimits;
//# sourceMappingURL=scanParameteres.js.map