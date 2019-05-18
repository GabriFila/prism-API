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

export function sendPut(resource: string, newValue: string | boolean | number) {
  console.log("resource: " + resource);
  
  fetch(`/${resource}`, {
    method: "PUT",
    body: JSON.stringify({ newValue }),
    headers: {
      "Content-type": "application/json"
    }
  });
}

import { UIparameters, limits } from "./UIparts/scanParameteres";
import { MicroState, ScanParams } from "../model";
export function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then((newState: MicroState) => {
      updateLimits(newState.scanParams);
      //updateUILasersFromState(newState);
      updateUIParameters(newState.scanParams);
      updateUIPads(newState.scanParams);
    });
}

import { lookSurface } from "./mainUI";

function updateUIPads(scanParams: ScanParams) {
  lookSurface.leftRelPos =
    (scanParams.offset.x.value * lookSurface.areaWidth) / limits.find(limit => limit.id == scanParams.offset.x.name).max;

  lookSurface.topRelPos =
    (scanParams.offset.y.value * lookSurface.areaHeight) / limits.find(limit => limit.id == scanParams.offset.y.name).max;

  lookSurface.elWidth = (scanParams.range.x.value * lookSurface.areaWidth) / limits.find(limit => limit.id == scanParams.range.x.name).max;
  lookSurface.elHeight =
    (scanParams.range.y.value * lookSurface.areaHeight) / limits.find(limit => limit.id == scanParams.range.y.name).max;
}

function updateUIParameters(scanParams: ScanParams) {
  let props = Object.keys(scanParams);
  props
    .filter(prop => {
      let innerProps = Object.keys((scanParams as any)[prop]);
      return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
    .forEach(prop => {
      (document.getElementById((scanParams as any)[prop].x.name) as HTMLInputElement).value = (scanParams as any)[prop].x.value.toString();
      (document.getElementById((scanParams as any)[prop].y.name) as HTMLInputElement).value = (scanParams as any)[prop].y.value.toString();
      (document.getElementById((scanParams as any)[prop].z.name) as HTMLInputElement).value = (scanParams as any)[prop].z.value.toString();
    });
  (document.getElementById("scanParams-dwellTime") as HTMLInputElement).value = scanParams.dwellTime.value.toString();
}

function updateLimits(scanParams: ScanParams) {

  let props = Object.keys(scanParams);
  props
    .filter(prop => {
      let innerProps = Object.keys((scanParams as any)[prop]);
      return innerProps.includes("x") && innerProps.includes("y") && innerProps.includes("z");
    })
    .forEach(prop => {
      limits.find(limit => limit.id == (scanParams as any)[prop].x.name).max = (scanParams as any)[prop].x.max;
      limits.find(limit => limit.id == (scanParams as any)[prop].x.name).min = (scanParams as any)[prop].x.min;

      limits.find(limit => limit.id == (scanParams as any)[prop].y.name).max = (scanParams as any)[prop].y.max;
      limits.find(limit => limit.id == (scanParams as any)[prop].y.name).min = (scanParams as any)[prop].y.min;

      limits.find(limit => limit.id == (scanParams as any)[prop].z.name).max = (scanParams as any)[prop].z.max;
      limits.find(limit => limit.id == (scanParams as any)[prop].z.name).min = (scanParams as any)[prop].z.min;
    });
  limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
