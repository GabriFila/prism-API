/*
import { updateUILasersFromLasers, updateUILasersFromState } from "./UIparts/lasers";
import { lookSurface } from "./mainUI";
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



function updateUIPads(newState: MicroState) {
  lookSurface.leftRelPos = (newState.scanParams.offset.x.value * lookSurface.areaWidth) / limits[0].max;
  lookSurface.topRelPos = (newState.scanParams.offset.y.value * lookSurface.areaHeight) / limits[1].max;
  lookSurface.elWidth = (newState.scanParams.range.x.value * lookSurface.areaWidth) / limits[6].max;
  lookSurface.elHeight = (newState.scanParams.range.y.value * lookSurface.areaHeight) / limits[7].max;
}

export function sendMode(newMode: string) {
  fetch("/prismState/mode", {
    method: "PUT",
    body: JSON.stringify({ newMode }),
    headers: {
      "Content-type": "application/json"
    }
  });
}

*/
import { UIparameters, updateLimits, updateUIParameters } from "./UIparts/scanParameteres";
import { MicroState } from "../model";
export function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then((newState : MicroState) => {
      updateLimits(newState.scanParams);
      //updateUILasersFromState(newState);
       updateUIParameters(newState.scanParams);
      //updateUIPads(newState);
    });
}
