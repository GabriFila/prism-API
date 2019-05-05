const laserPower0: HTMLLabelElement = document.querySelector("#slider-value-0");
const laserPower1: HTMLLabelElement = document.querySelector("#slider-value-1");
const laserPower2: HTMLLabelElement = document.querySelector("#slider-value-2");
const laserPower3: HTMLLabelElement = document.querySelector("#slider-value-3");

const laserSlider0: HTMLInputElement = document.querySelector("#slider-0");
const laserSlider1: HTMLInputElement = document.querySelector("#slider-1");
const laserSlider2: HTMLInputElement = document.querySelector("#slider-2");
const laserSlider3: HTMLInputElement = document.querySelector("#slider-3");

const laserOnOffBtn0: HTMLButtonElement = document.querySelector("#laser-on-off-btn-0");
const laserOnOffBtn1: HTMLButtonElement = document.querySelector("#laser-on-off-btn-1");
const laserOnOffBtn2: HTMLButtonElement = document.querySelector("#laser-on-off-btn-2");
const laserOnOffBtn3: HTMLButtonElement = document.querySelector("#laser-on-off-btn-3");

const laserWaveLength0: HTMLSelectElement = document.querySelector("#laser-type-0");
const laserWaveLengt1: HTMLSelectElement = document.querySelector("#laser-type-1");
const laserWaveLength2: HTMLSelectElement = document.querySelector("#laser-type-2");
const laserWaveLength3: HTMLSelectElement = document.querySelector("#laser-type-3");

export const laserSliders: HTMLInputElement[] = [laserSlider0, laserSlider1, laserSlider2, laserSlider3];
export const laserPowers: HTMLLabelElement[] = [laserPower0, laserPower1, laserPower2, laserPower3];
export const laserOnOffBtns: HTMLButtonElement[] = [laserOnOffBtn0, laserOnOffBtn1, laserOnOffBtn2, laserOnOffBtn3];
export const laserWaveLengths: HTMLSelectElement[] = [
  laserWaveLength0,
  laserWaveLengt1,
  laserWaveLength2,
  laserWaveLength3
];

export function laserOff(i: number) {
  laserSliders[i].disabled = true;
  laserSliders[i].classList.add("grayed-out");
  laserWaveLengths[i].classList.add("grayed-out");
  laserPowers[i].classList.add("grayed-out");
  laserOnOffBtns[i].classList.add("laser-btn-off");
  laserOnOffBtns[i].classList.remove("laser-btn-on");
}

export function laserOn(i: number) {
  laserSliders[i].disabled = false;
  laserSliders[i].classList.remove("grayed-out");
  laserWaveLengths[i].classList.remove("grayed-out");
  laserPowers[i].classList.remove("grayed-out");
  laserOnOffBtns[i].classList.remove("laser-btn-off");
  laserOnOffBtns[i].classList.add("laser-btn-on");
}
