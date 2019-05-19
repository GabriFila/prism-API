import { PinchObj } from "./drag-pinch-joystick/pinchObj";
import { inspectArea, sampleArea } from "./drag-pinch-joystick/movObj";
import { limits } from "./limits";
import { offsetX, offsetY, rangeX, rangeY } from "./scanParameteres";
import { sendPut } from "../toFromAPI";

export const lookSurface = new PinchObj(inspectArea, sampleArea, 20);

export function setUpLookSurface() {
  //update own UI parameters
  lookSurface.area.addEventListener("touchmove", () => {
    offsetX.value = String((lookSurface.leftRelPos * limits.find(limit => limit.id == "scanParams-offset-x").max) / lookSurface.areaWidth);
    offsetY.value = String((lookSurface.topRelPos * limits.find(limit => limit.id == "scanParams-offset-y").max) / lookSurface.areaHeight);
    rangeX.value = String((lookSurface.elWidth * limits.find(limit => limit.id == "scanParams-range-x").max) / lookSurface.areaWidth);
    rangeY.value = String((lookSurface.elHeight * limits.find(limit => limit.id == "scanParams-range-y").max) / lookSurface.areaHeight);
  });
  //send parameter change when untouched
  lookSurface.area.addEventListener("touchend", () => {
    sendPut("prismState/scanParams/offset/x", Number(offsetX.value));
    sendPut("prismState/scanParams/offset/y", Number(offsetY.value));
    sendPut("prismState/scanParams/range/x", Number(rangeX.value));
    sendPut("prismState/scanParams/range/y", Number(rangeY.value));
  });
}
