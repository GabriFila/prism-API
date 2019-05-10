import { UIparameters } from "./UIparts/scanParameteres";
import { updateUILasersFromLasers } from "./UIparts/lasers";

const source = new EventSource("/updates");

export function setUpUpdater() {
  source.addEventListener("offset-x-updated", (event: any) => {
    UIparameters[0].value = JSON.parse(event.data).newValue;
  });
  source.addEventListener("offset-y-updated", (event: any) => {
    UIparameters[1].value = JSON.parse(event.data).newValue;
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
  });
  source.addEventListener("range-y-updated", (event: any) => {
    UIparameters[7].value = JSON.parse(event.data).newValue;
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
