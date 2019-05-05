"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.parameters = [
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
function sendParamChange(input) {
    let resource;
    switch (input) {
        case exports.parameters[0]:
            resource = "offset/X";
            break;
        case exports.parameters[1]:
            resource = "offset/Y";
            break;
        case exports.parameters[2]:
            resource = "offset/Z";
            break;
        case exports.parameters[3]:
            resource = "pix-num/X";
            break;
        case exports.parameters[4]:
            resource = "pix-num/Y";
            break;
        case exports.parameters[5]:
            resource = "pix-num/Z";
            break;
        case exports.parameters[6]:
            resource = "range/X";
            break;
        case exports.parameters[7]:
            resource = "range/Y";
            break;
        case exports.parameters[8]:
            resource = "range/Z";
            break;
        case exports.parameters[9]:
            resource = "time";
            break;
    }
    let msg = {
        title: "messaggio",
        testo: "testo del messaggio"
    };
    fetch("/prism-state/scan-param/" + resource, {
        method: "PUT",
        body: JSON.stringify(msg),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    });
}
exports.sendParamChange = sendParamChange;
//# sourceMappingURL=scanParameteres.js.map