"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaxMin {
    constructor() {
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
let limits = [];
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
console.log(offsetX);
exports.UIparameters.forEach(param => {
    console.log(param);
    limits.push(new Limit(param.id));
});
exports.addPresetBtn = document.querySelector("#add-preset-btn");
exports.presetSelector = document.querySelector("#preset-selector");
//export const limits: MaxMin[] = [];
//fills limits
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
function updateUIParameters(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        document.getElementById(scanParams[prop].x.name).value = scanParams[prop].x.value.toString();
        document.getElementById(scanParams[prop].y.name).value = scanParams[prop].y.value.toString();
        document.getElementById(scanParams[prop].z.name).value = scanParams[prop].z.value.toString();
    });
    document.getElementById("dwellTime").value = scanParams.dwellTime.value.toString();
}
exports.updateUIParameters = updateUIParameters;
function updateLimits(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        limits.find(limit => limit.id == scanParams[prop].x.name).max = scanParams[prop].x.max;
        limits.find(limit => limit.id == scanParams[prop].x.name).min = scanParams[prop].x.min;
        limits.find(limit => limit.id == scanParams[prop].y.name).max = scanParams[prop].y.max;
        limits.find(limit => limit.id == scanParams[prop].y.name).min = scanParams[prop].y.min;
        limits.find(limit => limit.id == scanParams[prop].z.name).max = scanParams[prop].z.max;
        limits.find(limit => limit.id == scanParams[prop].z.name).min = scanParams[prop].z.min;
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
exports.updateLimits = updateLimits;
//# sourceMappingURL=scanParameteres.js.map