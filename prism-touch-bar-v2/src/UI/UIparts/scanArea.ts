import { PinchObj } from "./drag-pinch-joystick/pinchObj";
import { limits } from "./limits";
import { offsetX, offsetY, rangeX, rangeY } from "./scanParameteres";
import { sendPut } from "../toFromAPI";


const inspectArea: HTMLDivElement = document.querySelector("#scan-area");
const sampleArea: HTMLDivElement = document.querySelector("#total-area");
export const scanArea = new PinchObj(inspectArea, sampleArea, 20);

export function setUpLookSurface() {
  //update own UI parameters
  scanArea.area.addEventListener("touchmove", () => {
    offsetX.value = (
      (scanArea.leftRelPos * limits.find(limit => limit.id == "scanParams-offset-x").max) /
      scanArea.areaWidth
    ).toPrecision(4);
    offsetY.value = (
      (scanArea.topRelPos * limits.find(limit => limit.id == "scanParams-offset-y").max) /
      scanArea.areaHeight
    ).toPrecision(4);
    rangeX.value = ((scanArea.elWidth * limits.find(limit => limit.id == "scanParams-range-x").max) / scanArea.areaWidth).toPrecision(
      4
    );
    rangeY.value = (
      (scanArea.elHeight * limits.find(limit => limit.id == "scanParams-range-y").max) /
      scanArea.areaHeight
    ).toPrecision(4);
  });

  window.addEventListener("resize", adatapLookSurface);

  //send parameter change when untouched
  scanArea.area.addEventListener("touchend", () => {
    sendPut("prismState/scanParams/offset/x", Number(offsetX.value));
    sendPut("prismState/scanParams/offset/y", Number(offsetY.value));
    sendPut("prismState/scanParams/range/x", Number(rangeX.value));
    sendPut("prismState/scanParams/range/y", Number(rangeY.value));
  });
}

export function adatapLookSurface() {
  scanArea.leftRelPos = (Number(offsetX.value) * scanArea.areaWidth) / limits.find(limit => limit.id == offsetX.id).max;
  scanArea.topRelPos = (Number(offsetY.value) * scanArea.areaHeight) / limits.find(limit => limit.id == offsetY.id).max;
  scanArea.elWidth = (Number(rangeX.value) * scanArea.areaWidth) / limits.find(limit => limit.id == rangeX.id).max;
  scanArea.elHeight = (Number(rangeY.value) * scanArea.areaHeight) / limits.find(limit => limit.id == rangeY.id).max;
}
