import { UIparameters, limits, updateLimits, updateUIParameters } from "./UIparts/scanParameteres";
import { updateUILasersFromLasers, updateUILasersFromState } from "./UIparts/lasers";
import { lookSurface } from "./mainUI";
import { State } from "./UIparts/classes";

const source = new EventSource("/updates");

export function setUpUpdater() {
  source.addEventListener("offset-x-updated", (event: any) => {
    UIparameters[0].value = JSON.parse(event.data).newValue;
    lookSurface.leftRelPos = (Number(UIparameters[0].value) * lookSurface.areaWidth) / limits[0].max;
  });
  source.addEventListener("offset-y-updated", (event: any) => {
    UIparameters[1].value = JSON.parse(event.data).newValue;
    lookSurface.topRelPos = (Number(UIparameters[1].value) * lookSurface.areaHeight) / limits[1].max;
  });
  source.addEventListener("offset-z-updated", (event: any) => {
    UIparameters[2].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("pixelNumber-x-updated", (event: any) => {
    UIparameters[3].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("pixelNumber-y-updated", (event: any) => {
    UIparameters[4].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("pixelNumber-z-updated", (event: any) => {
    UIparameters[5].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("range-x-updated", (event: any) => {
    UIparameters[6].value = JSON.parse(event.data).newValue;
    lookSurface.elWidth = (Number(UIparameters[6].value) * lookSurface.areaWidth) / limits[6].max;
  });
  source.addEventListener("range-y-updated", (event: any) => {
    UIparameters[7].value = JSON.parse(event.data).newValue;
    lookSurface.elHeight = (Number(UIparameters[7].value) * lookSurface.areaHeight) / limits[7].max;
  });
  source.addEventListener("range-z-updated", (event: any) => {
    UIparameters[8].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("dwellTime-updated", (event: any) => {
    UIparameters[9].value = JSON.parse(event.data).newValue;
  });

  source.addEventListener("lasers-updated", (event: any) => {
    updateUILasersFromLasers(JSON.parse(event.data));
  });
}

export function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then(newState => {
      newState;
      updateLimits(newState);
      updateUILasersFromState(newState);
      updateUIParameters(newState);
      updateUIPads(newState);
    });
}

function updateUIPads(newState: State) {
  console.log(`Before ${lookSurface.leftRelPos}`);
  lookSurface.leftRelPos = (newState.scanParams.offset.x.current * lookSurface.areaWidth) / limits[0].max;
  console.log(`After ${lookSurface.leftRelPos}`);
  console.log("   ");

  lookSurface.topRelPos = (newState.scanParams.offset.y.current * lookSurface.areaHeight) / limits[1].max;
  lookSurface.elWidth = (newState.scanParams.range.x.current * lookSurface.areaWidth) / limits[6].max;
  lookSurface.elHeight = (newState.scanParams.range.y.current * lookSurface.areaHeight) / limits[7].max;
}
