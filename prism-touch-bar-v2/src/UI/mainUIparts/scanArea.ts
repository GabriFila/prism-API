import { PinchObj } from "../dragPinchJoystick/pinchObj";
import { offsetX, offsetY, rangeX, rangeY, limits, changeScanParam } from "./scanParameteres";
import { sendPut } from "./toFromAPI";

const inspectArea: HTMLDivElement = document.querySelector("#scan-area");
const sampleArea: HTMLDivElement = document.querySelector("#total-area");
export const scanArea = new PinchObj(inspectArea, sampleArea, 20);

export function setUpLookSurface() {
  //update own UI parameters
  scanArea.area.addEventListener("touchmove", () => {
    changeScanParam(offsetX.id, (scanArea.leftRelPos * limits.find(limit => limit.id == offsetX.id).max) / scanArea.areaWidth, false);
    changeScanParam(offsetY.id, (scanArea.topRelPos * limits.find(limit => limit.id == offsetY.id).max) / scanArea.areaHeight, false);
    changeScanParam(rangeX.id, (scanArea.elWidth * limits.find(limit => limit.id == rangeX.id).max) / scanArea.areaWidth, false);
    changeScanParam(rangeY.id, (scanArea.elHeight * limits.find(limit => limit.id == rangeY.id).max) / scanArea.areaHeight, false);
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
