const source = new EventSource("/updates");

export function setUpUpdater() {
  source.addEventListener("update", (event: any) => {
    let resource: Resource = JSON.parse(event.data).resource;
    console.log("data: " + event.data);
    let idEls: string[] = resource.name.split("-");
    switch (idEls[0]) {
      case "scanParams":
        (document.getElementById(resource.name) as HTMLInputElement).value = resource.value.toString();
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

import { UIparameters, limits } from "./UIparts/scanParameteres";
import { MicroState, ScanParams, Resource } from "../model";
export function getCurrentState() {
  fetch("/prismState/")
    .then(res => res.json())
    .then((newState: MicroState) => {
      updateLimits(newState.scanParams);
      updateUILasersFromLasers(newState.lasers);
      updateUIParameters(newState.scanParams);
      updateUIPads(newState.scanParams);
    });
}

import { lookSurface } from "./mainUI";
import { updateUILasersFromLasers, laserUIRows } from "./UIparts/lasers";
import { isNullOrUndefined } from "util";

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
