"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LaserUIRow {
    get isOn() {
        return this._isOn;
    }
    set isOn(value) {
        if (value)
            this.lightUp();
        else
            this.grayOut();
        this._isOn = value;
    }
    get waveLength() {
        return Number(this.waveLengthLabel.innerHTML.slice(0, -1).slice(0, -1));
    }
    get power() {
        return Number(this.powerLabel.innerHTML.slice(0, -1));
    }
    set power(value) {
        this._power = value;
        this.powerLabel.innerHTML = value.toString() + "%";
        this.slider.value = value.toString();
    }
    constructor(box, waveLengthLabel, slider, btn, powerLabel, visible, position) {
        this.box = box;
        this.waveLengthLabel = waveLengthLabel;
        this.slider = slider;
        this.btn = btn;
        this.powerLabel = powerLabel;
        this.visible = visible;
        this.position = position;
        this.isOn = false;
    }
    grayOut() {
        this.slider.disabled = true;
        this.box.classList.add("grayed-out");
        this.btn.classList.remove("laser-btn-on");
        this.btn.classList.add("laser-btn-off");
    }
    lightUp() {
        this.slider.disabled = false;
        this.box.classList.remove("grayed-out");
        this.btn.classList.remove("laser-btn-off");
        this.btn.classList.add("laser-btn-on");
    }
}
const laserOnOffBtns = document.querySelectorAll(".laser-on-off-btn");
const laserWaveLengths = document.querySelectorAll(".laser-type");
const laserSliders = document.querySelectorAll(".slider");
const laserPowers = document.querySelectorAll(".laser-power");
const laserRows = document.querySelectorAll(".slider-row");
exports.laserUIRows = [];
laserRows.forEach((laserRow, i) => {
    exports.laserUIRows.push(new LaserUIRow(laserRow, laserWaveLengths[i], laserSliders[i], laserOnOffBtns[i], laserPowers[i], true, i));
});
function updateUILasersFromLasers(lasers) {
    exports.laserUIRows.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= lasers.length)
            exports.laserUIRows[i].visible = false;
        else {
            exports.laserUIRows[i].powerLabel.innerHTML = lasers[i].power.value.toString() + "%";
            exports.laserUIRows[i].slider.value = lasers[i].power.value.toString();
            exports.laserUIRows[i].waveLengthLabel.innerHTML = lasers[i].waveLength.value.toString() + "nm";
            exports.laserUIRows[i].isOn = lasers[i].isOn.value;
        }
    });
}
exports.updateUILasersFromLasers = updateUILasersFromLasers;
//# sourceMappingURL=lasers.js.map