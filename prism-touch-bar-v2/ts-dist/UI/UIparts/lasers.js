"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LaserUIBox {
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
}
const laserBox0 = document.querySelector("#slider-box-0");
const laserBox1 = document.querySelector("#slider-box-1");
const laserBox2 = document.querySelector("#slider-box-2");
const laserBox3 = document.querySelector("#slider-box-3");
const laserPower0 = document.querySelector("#laser-power-0");
const laserPower1 = document.querySelector("#laser-power-1");
const laserPower2 = document.querySelector("#laser-power-2");
const laserPower3 = document.querySelector("#laser-power-3");
const laserSlider0 = document.querySelector("#slider-0");
const laserSlider1 = document.querySelector("#slider-1");
const laserSlider2 = document.querySelector("#slider-2");
const laserSlider3 = document.querySelector("#slider-3");
const laserOnOffBtn0 = document.querySelector("#laser-on-off-btn-0");
const laserOnOffBtn1 = document.querySelector("#laser-on-off-btn-1");
const laserOnOffBtn2 = document.querySelector("#laser-on-off-btn-2");
const laserOnOffBtn3 = document.querySelector("#laser-on-off-btn-3");
const laserWaveLength0 = document.querySelector("#laser-type-0");
const laserWaveLength1 = document.querySelector("#laser-type-1");
const laserWaveLength2 = document.querySelector("#laser-type-2");
const laserWaveLength3 = document.querySelector("#laser-type-3");
exports.laserUIBoxes = [
    new LaserUIBox(laserBox0, laserWaveLength0, laserSlider0, laserOnOffBtn0, laserPower0, true, 0),
    new LaserUIBox(laserBox1, laserWaveLength1, laserSlider1, laserOnOffBtn1, laserPower1, true, 1),
    new LaserUIBox(laserBox2, laserWaveLength2, laserSlider2, laserOnOffBtn2, laserPower2, true, 2),
    new LaserUIBox(laserBox3, laserWaveLength3, laserSlider3, laserOnOffBtn3, laserPower3, true, 3)
];
function grayOutLaserBox(laserBox) {
    laserBox.slider.disabled = true;
    laserBox.box.classList.add("grayed-out");
    laserBox.btn.classList.remove("laser-btn-on");
    laserBox.btn.classList.add("laser-btn-off");
}
exports.grayOutLaserBox = grayOutLaserBox;
function lightUpLaserBox(laserBox) {
    laserBox.slider.disabled = false;
    laserBox.box.classList.remove("grayed-out");
    laserBox.btn.classList.remove("laser-btn-off");
    laserBox.btn.classList.add("laser-btn-on");
}
exports.lightUpLaserBox = lightUpLaserBox;
function updateUILasersFromState(newState) {
    exports.laserUIBoxes.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= newState.lasers.length)
            exports.laserUIBoxes[i].visible = false;
        else {
            exports.laserUIBoxes[i].powerLabel.innerHTML = newState.lasers[i].power.toString() + "%";
            exports.laserUIBoxes[i].slider.value = newState.lasers[i].power.toString();
            exports.laserUIBoxes[i].waveLengthLabel.innerHTML = newState.lasers[i].waveLength.toString() + "nm";
            exports.laserUIBoxes[i].isOn = newState.lasers[i].isOn;
            if (newState.lasers[i].isOn)
                lightUpLaserBox(exports.laserUIBoxes[i]);
            else
                grayOutLaserBox(exports.laserUIBoxes[i]);
        }
    });
}
exports.updateUILasersFromState = updateUILasersFromState;
function updateUILasersFromLasers(lasers) {
    exports.laserUIBoxes.forEach((laserUIBox, i) => {
        //hide empty lasers
        if (i >= lasers.length)
            exports.laserUIBoxes[i].visible = false;
        else {
            exports.laserUIBoxes[i].powerLabel.innerHTML = lasers[i].power.toString() + "%";
            exports.laserUIBoxes[i].slider.value = lasers[i].power.toString();
            exports.laserUIBoxes[i].waveLengthLabel.innerHTML = lasers[i].waveLength.toString() + "nm";
            exports.laserUIBoxes[i].isOn = lasers[i].isOn;
            if (lasers[i].isOn)
                lightUpLaserBox(exports.laserUIBoxes[i]);
            else
                grayOutLaserBox(exports.laserUIBoxes[i]);
        }
    });
}
exports.updateUILasersFromLasers = updateUILasersFromLasers;
function sendLaserData(laserBox) {
    fetch(`prismState/lasers/${Number(laserBox.waveLengthLabel.innerHTML.slice(0, -1).slice(0, -1))}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            newPower: Number(laserBox.powerLabel.innerHTML.slice(0, -1)),
            isOn: laserBox.isOn
        })
    }).then(res => res.json());
}
exports.sendLaserData = sendLaserData;
//# sourceMappingURL=lasers.js.map