"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const laserPower0 = document.querySelector("#slider-value-0");
const laserPower1 = document.querySelector("#slider-value-1");
const laserPower2 = document.querySelector("#slider-value-2");
const laserPower3 = document.querySelector("#slider-value-3");
const laserSlider0 = document.querySelector("#slider-0");
const laserSlider1 = document.querySelector("#slider-1");
const laserSlider2 = document.querySelector("#slider-2");
const laserSlider3 = document.querySelector("#slider-3");
const laserOnOffBtn0 = document.querySelector("#laser-on-off-btn-0");
const laserOnOffBtn1 = document.querySelector("#laser-on-off-btn-1");
const laserOnOffBtn2 = document.querySelector("#laser-on-off-btn-2");
const laserOnOffBtn3 = document.querySelector("#laser-on-off-btn-3");
const laserWaveLength0 = document.querySelector("#laser-type-0");
const laserWaveLengt1 = document.querySelector("#laser-type-1");
const laserWaveLength2 = document.querySelector("#laser-type-2");
const laserWaveLength3 = document.querySelector("#laser-type-3");
exports.laserSliders = [laserSlider0, laserSlider1, laserSlider2, laserSlider3];
exports.laserPowers = [laserPower0, laserPower1, laserPower2, laserPower3];
exports.laserOnOffBtns = [laserOnOffBtn0, laserOnOffBtn1, laserOnOffBtn2, laserOnOffBtn3];
exports.laserWaveLengths = [
    laserWaveLength0,
    laserWaveLengt1,
    laserWaveLength2,
    laserWaveLength3
];
function laserOff(i) {
    exports.laserSliders[i].disabled = true;
    exports.laserSliders[i].classList.add("grayed-out");
    exports.laserWaveLengths[i].classList.add("grayed-out");
    exports.laserPowers[i].classList.add("grayed-out");
    exports.laserOnOffBtns[i].classList.add("laser-btn-off");
    exports.laserOnOffBtns[i].classList.remove("laser-btn-on");
}
exports.laserOff = laserOff;
function laserOn(i) {
    exports.laserSliders[i].disabled = false;
    exports.laserSliders[i].classList.remove("grayed-out");
    exports.laserWaveLengths[i].classList.remove("grayed-out");
    exports.laserPowers[i].classList.remove("grayed-out");
    exports.laserOnOffBtns[i].classList.remove("laser-btn-off");
    exports.laserOnOffBtns[i].classList.add("laser-btn-on");
}
exports.laserOn = laserOn;
//# sourceMappingURL=lasers.js.map