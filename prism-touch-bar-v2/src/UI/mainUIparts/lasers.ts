import { Laser } from "../../model";
import { sendPut } from "./toFromAPI";

class LaserUIRow {
  box: HTMLDivElement;
  waveLengthLabel: HTMLLabelElement;
  slider: HTMLInputElement;
  btn: HTMLButtonElement;
  powerLabel: HTMLLabelElement;
  private _isOn: boolean;
  public get isOn(): boolean {
    return this._isOn;
  }
  public set isOn(value: boolean) {
    if (value) this.lightUp();
    else this.grayOut();
    this._isOn = value;
  }
  private _visible: boolean;
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(value: boolean) {
    if (!value) this.box.style.display = "none";
    this._visible = value;
  }
  position: number;
  private _waveLength: number;
  public get waveLength(): number {
    return Number(this.waveLengthLabel.innerHTML.slice(0, -1).slice(0, -1));
  }

  private _power: number;
  public get power(): number {
    return Number(this.powerLabel.innerHTML.slice(0, -1));
  }
  public set power(value: number) {
    this._power = value;
    this.powerLabel.innerHTML = value.toString() + "%";
    this.slider.value = value.toString();
  }

  constructor(
    box: HTMLDivElement,
    waveLengthLabel: HTMLLabelElement,
    slider: HTMLInputElement,
    btn: HTMLButtonElement,
    powerLabel: HTMLLabelElement,
    visible: boolean,
    position: number
  ) {
    this.box = box;
    this.waveLengthLabel = waveLengthLabel;
    this.slider = slider;
    this.btn = btn;
    this.powerLabel = powerLabel;
    this.visible = visible;
    this.position = position;
    this.isOn = false;
  }

  private grayOut() {
    this.slider.disabled = true;
    this.box.classList.add("grayed-out");
    this.btn.classList.remove("laser-btn-on");
    this.btn.classList.add("laser-btn-off");
  }

  private lightUp() {
    this.slider.disabled = false;
    this.box.classList.remove("grayed-out");
    this.btn.classList.remove("laser-btn-off");
    this.btn.classList.add("laser-btn-on");
  }
}

const laserOnOffBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".laser-on-off-btn");
const laserWaveLengths: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".laser-type");
const laserSliders: NodeListOf<HTMLInputElement> = document.querySelectorAll(".slider");
const laserPowers: NodeListOf<HTMLLabelElement> = document.querySelectorAll(".laser-power");
const laserRows: NodeListOf<HTMLDivElement> = document.querySelectorAll(".slider-row");

export const laserUIRows: LaserUIRow[] = [];

laserRows.forEach((laserRow, i) => {
  laserUIRows.push(new LaserUIRow(laserRow, laserWaveLengths[i], laserSliders[i], laserOnOffBtns[i], laserPowers[i], true, i));
});

export function updateUILasersFromLasers(lasers: Laser[]) {
  laserUIRows.forEach((laserUIBox, i) => {
    //hide empty lasers
    if (!lasers[i].isPresent.value) laserUIBox.visible = false;
    else {
      laserUIBox.visible = true;
      laserUIRows[i].powerLabel.innerHTML = lasers[i].power.value.toString() + "%";
      laserUIRows[i].slider.value = lasers[i].power.value.toString();

      laserUIRows[i].waveLengthLabel.innerHTML = lasers[i].waveLength.value.toString() + "nm";
      laserUIRows[i].isOn = lasers[i].isOn.value as boolean;
    }
  });
}

export function setUpLasers() {
  //adds event to slider box for slider movement and on/off button
  laserUIRows.forEach(laserUIRow => {
    laserUIRow.slider.addEventListener("input", () => {
      let tempValue = laserUIRow.slider.value;
      laserUIRow.powerLabel.innerHTML = tempValue + "%";
    });
    laserUIRow.slider.addEventListener("touchend", laserSliderMoved);
    laserUIRow.slider.addEventListener("mouseup", laserSliderMoved);

    function laserSliderMoved() {
      let tempValue = laserUIRow.slider.value;
      laserUIRow.powerLabel.innerHTML = tempValue + "%";
      sendPut(`prismState/lasers/power?waveLength=${laserUIRow.waveLength}`, Number(laserUIRow.power));
    }

    laserUIRow.btn.addEventListener("touchend", onOffBtnChanged);
    laserUIRow.btn.addEventListener("mouseup", onOffBtnChanged);

    function onOffBtnChanged() {
      laserUIRow.isOn = !laserUIRow.isOn;
      sendPut(`prismState/lasers/isOn?waveLength=${laserUIRow.waveLength}`, laserUIRow.isOn);
    }
  });
}
