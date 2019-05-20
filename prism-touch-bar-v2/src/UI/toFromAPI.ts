import { MicroState, Resource } from "../model";
import { updateUILasersFromLasers, laserUIRows } from "./UIparts/lasers";
import { updateUIParameters, updateLimits, limits } from "./UIparts/scanParameteres";
import { scanArea, adatapLookSurface } from "./UIparts/scanArea";
import { updateModeBtns } from "./UIparts/mode";

const source = new EventSource("/updates");

export function setUpUpdater() {  
  source.addEventListener("update", (event: any) => {
    let resource: Resource = JSON.parse(event.data).resource;
    let idEls: string[] = resource.id.split("-");
    switch (idEls[0]) {
      case "mode":
        updateModeBtns(resource.value as string);
        break;
      case "scanParams":
        (document.getElementById(resource.id) as HTMLInputElement).value = resource.value.toString();
        updatePadsFromResName(resource.id);
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
      adatapLookSurface();
    });
}

function updatePadsFromResName(id: string) {
  let idEls = id.split("-");
  if (idEls[1] == "offset") {
    if (idEls[2] == "x")
      scanArea.leftRelPos =
        (Number((document.getElementById(id) as HTMLInputElement).value) * scanArea.areaWidth) / limits.find(limit => limit.id == id).max;
    else if (idEls[2] == "y")
      scanArea.topRelPos =
        (Number((document.getElementById(id) as HTMLInputElement).value) * scanArea.areaHeight) / limits.find(limit => limit.id == id).max;
  } else if (idEls[2] == "x")
    scanArea.elWidth =
      (Number((document.getElementById(id) as HTMLInputElement).value) * scanArea.areaWidth) / limits.find(limit => limit.id == id).max;
  else if (idEls[2] == "y")
    scanArea.elHeight =
      (Number((document.getElementById(id) as HTMLInputElement).value) * scanArea.areaHeight) / limits.find(limit => limit.id == id).max;
}
