"use strict";
/*
import { updateUILasersFromLasers, updateUILasersFromState } from "./UIparts/lasers";
import { updateMode } from "./UIparts/mode";
import { MicroState } from "../model";

const source = new EventSource("/updates");

export function setUpUpdater() {
  source.addEventListener("updated-offset-x", (event: any) => {
    UIparameters[0].value = JSON.parse(event.data).newValue;
    lookSurface.leftRelPos = (Number(UIparameters[0].value) * lookSurface.areaWidth) / limits[0].max;
  });
  source.addEventListener("updated-offset-y", (event: any) => {
    UIparameters[1].value = JSON.parse(event.data).newValue;
    lookSurface.topRelPos = (Number(UIparameters[1].value) * lookSurface.areaHeight) / limits[1].max;
  });
  source.addEventListener("updated-offset-z", (event: any) => {
    UIparameters[2].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("updated-pixelNumber-x", (event: any) => {
    UIparameters[3].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("updated-pixelNumber-y", (event: any) => {
    UIparameters[4].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("updated-pixelNumber-z", (event: any) => {
    UIparameters[5].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("updated-range-x", (event: any) => {
    UIparameters[6].value = JSON.parse(event.data).newValue;
    lookSurface.elWidth = (Number(UIparameters[6].value) * lookSurface.areaWidth) / limits[6].max;
  });
  source.addEventListener("updated-range-y", (event: any) => {
    UIparameters[7].value = JSON.parse(event.data).newValue;
    lookSurface.elHeight = (Number(UIparameters[7].value) * lookSurface.areaHeight) / limits[7].max;
  });
  source.addEventListener("updated-range-z", (event: any) => {
    UIparameters[8].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("updated-dwellTime", (event: any) => {
    UIparameters[9].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("limits-updated", (event: any) => {
    let newState = JSON.parse(event.data);
    updateLimits(newState);
    updateUIPads(newState);
  });

  source.addEventListener("updated-lasers", (event: any) => {
    updateUILasersFromLasers(JSON.parse(event.data));
  });

  source.addEventListener("updated-mode", (event: any) => {
    updateMode(JSON.parse(event.data).newMode);
  });

  source.addEventListener("updated-state", (event: any) => {
    let newState = JSON.parse(event.data).newState;
    updateLimits(newState);
    updateUIPads(newState);
    updateUILasersFromState(newState);
    updateUIParameters(newState);
  });
}




*/
Object.defineProperty(exports, "__esModule", { value: true });
function sendPut(resource, newValue) {
    console.log("resource: " + resource);
    fetch(`/${resource}`, {
        method: "PUT",
        body: JSON.stringify({ newValue }),
        headers: {
            "Content-type": "application/json"
        }
    });
}
exports.sendPut = sendPut;
const scanParameteres_1 = require("./UIparts/scanParameteres");
function getCurrentState() {
    fetch("/prismState/")
        .then(res => res.json())
        .then((newState) => {
        updateLimits(newState.scanParams);
        //updateUILasersFromState(newState);
        updateUIParameters(newState.scanParams);
        updateUIPads(newState.scanParams);
    });
}
exports.getCurrentState = getCurrentState;
const mainUI_1 = require("./mainUI");
function updateUIPads(scanParams) {
    mainUI_1.lookSurface.leftRelPos =
        (scanParams.offset.x.value * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParams.offset.x.name).max;
    mainUI_1.lookSurface.topRelPos =
        (scanParams.offset.y.value * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParams.offset.y.name).max;
    mainUI_1.lookSurface.elWidth = (scanParams.range.x.value * mainUI_1.lookSurface.areaWidth) / scanParameteres_1.limits.find(limit => limit.id == scanParams.range.x.name).max;
    mainUI_1.lookSurface.elHeight =
        (scanParams.range.y.value * mainUI_1.lookSurface.areaHeight) / scanParameteres_1.limits.find(limit => limit.id == scanParams.range.y.name).max;
}
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
    document.getElementById("scanParams-dwellTime").value = scanParams.dwellTime.value.toString();
}
function updateLimits(scanParams) {
    let props = Object.keys(scanParams);
    props
        .filter(prop => {
        let innerProps = Object.keys(scanParams[prop]);
        return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
        .forEach(prop => {
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].x.name).max = scanParams[prop].x.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].x.name).min = scanParams[prop].x.min;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].y.name).max = scanParams[prop].y.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].y.name).min = scanParams[prop].y.min;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].z.name).max = scanParams[prop].z.max;
        scanParameteres_1.limits.find(limit => limit.id == scanParams[prop].z.name).min = scanParams[prop].z.min;
    });
    scanParameteres_1.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
//# sourceMappingURL=UIupdater.js.map