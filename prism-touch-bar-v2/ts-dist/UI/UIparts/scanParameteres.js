"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toFromAPI_1 = require("../toFromAPI");
exports.offsetX = document.querySelector("#scanParams-offset-x");
exports.offsetY = document.querySelector("#scanParams-offset-y");
const pixelNumberX = document.querySelector("#scanParams-pixelNumber-x");
const pixelNumberY = document.querySelector("#scanParams-pixelNumber-y");
const pixelNumberZ = document.querySelector("#scanParams-pixelNumber-z");
exports.rangeX = document.querySelector("#scanParams-range-x");
exports.rangeY = document.querySelector("#scanParams-range-y");
const rangeZ = document.querySelector("#scanParams-range-z");
const dwellTime = document.querySelector("#scanParams-dwellTime");
const totalTime = document.querySelector("#scanParams-totalTime");
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
        changeScanParam(scanParams[prop].x.id, scanParams[prop].x.value);
        changeScanParam(scanParams[prop].y.id, scanParams[prop].y.value);
        changeScanParam(scanParams[prop].z.id, scanParams[prop].z.value);
        // (document.getElementById((scanParams[prop] as XYZ).x.id) as HTMLInputElement).value = (scanParams[prop] as XYZ).x.value.toString();
        //(document.getElementById((scanParams[prop] as XYZ).y.id) as HTMLInputElement).value = (scanParams[prop] as XYZ).y.value.toString();
        //(document.getElementById((scanParams[prop] as XYZ).z.id) as HTMLInputElement).value = (scanParams[prop] as XYZ).z.value.toString();
    });
    document.getElementById("scanParams-dwellTime").value = scanParams.dwellTime.value.toString();
}
exports.updateUIParameters = updateUIParameters;
function changeScanParam(id, value) {
    let el = document.querySelector(`#${id}`);
    if (exports.limits.find(limit => limit.id == id).check(Number(value))) {
        el.value = value.toString();
        if (Number(exports.offsetX.value) + Number(exports.rangeX.value) > exports.limits.find(limit => limit.id == exports.offsetX.id).max) {
            console.log("limit");
            exports.rangeX.value = (exports.limits.find(limit => limit.id == exports.offsetX.id).max - Number(exports.offsetX.value)).toString();
            console.log(exports.rangeX.value);
            toFromAPI_1.sendPut(`prismState/scanParams/range/x`, Number(exports.rangeX.value));
        }
        if (Number(exports.offsetY.value) + Number(exports.rangeY.value) > exports.limits.find(limit => limit.id == exports.offsetY.id).max) {
            exports.rangeY.value = (exports.limits.find(limit => limit.id == exports.offsetY.id).max - Number(exports.offsetY.value)).toString();
            toFromAPI_1.sendPut(`prismState/scanParams/range/y`, Number(exports.rangeY.value));
        }
        toFromAPI_1.sendPut(`prismState/${id.replace("-", "/").replace("-", "/")}`, Number(el.value));
    }
    else {
        let tempElLimit = el;
        tempElLimit.classList.add("limit");
        setTimeout(() => tempElLimit.classList.remove("limit"), 600);
    }
}
exports.changeScanParam = changeScanParam;
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
    check(value) {
        return value <= this.max && value >= this.min;
    }
}
exports.limits = [];
exports.UIparameters.forEach(param => exports.limits.push(new Limit(param.id)));
function updateLimits(scanParams) {
    getXYZproperties(scanParams).forEach(prop => {
        //updates limit for each scanParam that as xyz
        console.log(scanParams[prop]);
        exports.limits.find(limit => limit.id == scanParams[prop].x.id).max = scanParams[prop].x.max;
        exports.limits.find(limit => limit.id == scanParams[prop].x.id).min = scanParams[prop].x.min;
        exports.limits.find(limit => limit.id == scanParams[prop].y.id).max = scanParams[prop].y.max;
        exports.limits.find(limit => limit.id == scanParams[prop].y.id).min = scanParams[prop].y.min;
        exports.limits.find(limit => limit.id == scanParams[prop].z.id).max = scanParams[prop].z.max;
        exports.limits.find(limit => limit.id == scanParams[prop].z.id).min = scanParams[prop].z.min;
    });
    exports.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
exports.updateLimits = updateLimits;
//# sourceMappingURL=scanParameteres.js.map