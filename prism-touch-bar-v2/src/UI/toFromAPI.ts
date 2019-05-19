import { MicroState, ScanParams, Resource } from "../model";
import { updateUILasersFromLasers, laserUIRows } from "./UIparts/lasers";
import { updateLimits, limits } from "./UIparts/limits";
import { updateUIParameters } from "./UIparts/scanParameteres";
import { lookSurface } from "./UIparts/lookSurface";

const source = new EventSource("/updates");

export function setUpUpdater() {
  source.addEventListener("update", (event: any) => {
    let resource: Resource = JSON.parse(event.data).resource;
    console.log("data: " + event.data);
    let idEls: string[] = resource.name.split("-");
    switch (idEls[0]) {
      case "scanParams":
        (document.getElementById(resource.name) as HTMLInputElement).value = resource.value.toString();
        updatePadsFromResName(resource.name);
        break;
      case "laser":
        let targetLaserRow = laserUIRows.find(laserRow => laserRow.waveLength == Number(idEls[1]));
        switch (idEls[3]) {
          case "isOn":
            targetLaserRow.isOn = resource.value as boolean;
            break;
          case "power":
            targetLaserRow.power = resource.value as number;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  });
}

export function sendPut(resource: string, newValue: string | boolean | number) {
  fetch(`/${resource}`, {
    method: "PUT",
    body: JSON.stringify({ newValue }),
    headers: {
      "Content-type": "application/json"
    }
  });
}

export function getCurrentMicroState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then((newState: MicroState) => {
      updateLimits(newState.scanParams);
      updateUILasersFromLasers(newState.lasers);
      updateUIParameters(newState.scanParams);
      updateUIPads(newState.scanParams);
    });
}

function updateUIPads(scanParams: ScanParams) {
  lookSurface.leftRelPos =
    ((scanParams.offset.x.value as number) * lookSurface.areaWidth) / limits.find(limit => limit.id == scanParams.offset.x.name).max;
  lookSurface.topRelPos =
    ((scanParams.offset.y.value as number) * lookSurface.areaHeight) / limits.find(limit => limit.id == scanParams.offset.y.name).max;
  lookSurface.elWidth =
    ((scanParams.range.x.value as number) * lookSurface.areaWidth) / limits.find(limit => limit.id == scanParams.range.x.name).max;
  lookSurface.elHeight =
    ((scanParams.range.y.value as number) * lookSurface.areaHeight) / limits.find(limit => limit.id == scanParams.range.y.name).max;
}

function updatePadsFromResName(id: string) {
  let idEls = id.split("-");
  if (idEls[1] == "offset") {
    if (idEls[2] == "x")
      lookSurface.leftRelPos =
        (Number((document.getElementById(id) as HTMLInputElement).value) * lookSurface.areaWidth) /
        limits.find(limit => limit.id == id).max;
    else if (idEls[2] == "y")
      lookSurface.topRelPos =
        (Number((document.getElementById(id) as HTMLInputElement).value) * lookSurface.areaHeight) /
        limits.find(limit => limit.id == id).max;
  } else if (idEls[2] == "x")
    lookSurface.elWidth =
      (Number((document.getElementById(id) as HTMLInputElement).value) * lookSurface.areaWidth) / limits.find(limit => limit.id == id).max;
  else if (idEls[2] == "y")
    lookSurface.elHeight =
      (Number((document.getElementById(id) as HTMLInputElement).value) * lookSurface.areaHeight) / limits.find(limit => limit.id == id).max;
}
