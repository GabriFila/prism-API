"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offsetX = document.querySelector("#offset-x");
exports.offsetY = document.querySelector("#offset-y");
const pixelNumberX = document.querySelector("#pixelNumber-x");
const pixelNumberY = document.querySelector("#pixelNumber-y");
const pixelNumberZ = document.querySelector("#pixelNumber-z");
exports.rangeX = document.querySelector("#range-x");
exports.rangeY = document.querySelector("#range-y");
const rangeZ = document.querySelector("#range-z");
const dwellTime = document.querySelector("#dwellTime");
const totalTime = document.querySelector("#totalTime");
const tempUIparams = document.querySelectorAll(".param-input");
exports.UIparameters = [];
//remove grayed out elemts from tempUIparameters
tempUIparams.forEach(param => {
    if (!param.classList.contains("grayed-out")) {
        exports.UIparameters.push(param);
    }
});
//initialize limit array
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
function getXYZproperties(scanParams) {
    let props = Object.keys(scanParams);
    return props.filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    });
}
exports.getXYZproperties = getXYZproperties;
function updateUIParameters(scanParams) {
    getXYZproperties(scanParams).forEach(prop => {
        document.getElementById(scanParams[prop].x.name).value = scanParams[prop].x.value.toString();
        document.getElementById(scanParams[prop].y.name).value = scanParams[prop].y.value.toString();
        document.getElementById(scanParams[prop].z.name).value = scanParams[prop].z.value.toString();
    });
    document.getElementById("scanParams-dwellTime").value = scanParams.dwellTime.value.toString();
}
exports.updateUIParameters = updateUIParameters;
//# sourceMappingURL=scanParameteres.js.map