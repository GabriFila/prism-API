"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanParameteres_1 = require("./UIparts/scanParameteres");
const lasers_1 = require("./UIparts/lasers");
const source = new EventSource("/updates");
function setUpUpdater() {
    source.addEventListener("offset-x-updated", (event) => {
        scanParameteres_1.UIparameters[0].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("offset-y-updated", (event) => {
        scanParameteres_1.UIparameters[1].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("offset-z-updated", (event) => {
        scanParameteres_1.UIparameters[2].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-x-updated", (event) => {
        scanParameteres_1.UIparameters[3].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-y-updated", (event) => {
        scanParameteres_1.UIparameters[4].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("pixelNumber-z-updated", (event) => {
        scanParameteres_1.UIparameters[5].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("range-x-updated", (event) => {
        scanParameteres_1.UIparameters[6].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("range-y-updated", (event) => {
        scanParameteres_1.UIparameters[7].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("range-z-updated", (event) => {
        scanParameteres_1.UIparameters[8].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("dwellTime-updated", (event) => {
        scanParameteres_1.UIparameters[9].value = JSON.parse(event.data).newValue;
    });
    source.addEventListener("lasers-updated", (event) => {
        lasers_1.updateUILasersFromLasers(JSON.parse(event.data));
    });
}
exports.setUpUpdater = setUpUpdater;
//# sourceMappingURL=UIupdater.js.map