import { Laser } from "../../model";

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
  visible: boolean;
  position: number;
  private _waveLength: number;
  public get waveLength(): number {
    return Number(this.waveLengthLabel.innerHTML.slice(0, -1).slice(0, -1));
  }

  private _power: number;
  public get power(): number {
    return Number(this.powerLabel.innerHTML.slice(0, -1));
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
    if (i >= lasers.length) laserUIRows[i].visible = false;
    else {
      laserUIRows[i].powerLabel.innerHTML = lasers[i].power.value.toString() + "%";
      laserUIRows[i].slider.value = lasers[i].power.value.toString();

      laserUIRows[i].waveLengthLabel.innerHTML = lasers[i].waveLength.value.toString() + "nm";
      laserUIRows[i].isOn = lasers[i].isOn.value as boolean;
    }
  });
}
