export class MovObj {
  public element: HTMLDivElement;
  public area: HTMLDivElement;
  active: boolean;

  private _elBorderSize: number;
  public get elBorderSize(): number {
    return this._elBorderSize;
  }
  private _areaBorderSize: number;
  public get areaBorderSize(): number {
    return this._areaBorderSize;
  }

  private _topRelPos: number;
  public get topRelPos(): number {
    return this._topRelPos;
  }
  public set topRelPos(value: number) {
    this._topRelPos = value;
    this.translateToUI(this._leftRelPos, this._topRelPos, this.element);
  }

  private _leftRelPos: number;
  public get leftRelPos(): number {
    return this._leftRelPos;
  }
  public set leftRelPos(value: number) {
    this._leftRelPos = value;
    this.translateToUI(this._leftRelPos, this.topRelPos, this.element);
  }

  constructor(element: HTMLDivElement, area: HTMLDivElement) {
    this.element = element;
    this.area = area;
    this.active = false;
    this.updateElBorderSize();
    this.updateAreaBorderSize();
    this.updateTopLeftRelPos();
  }

  private updateTopLeftRelPos() {
    this._topRelPos =
      this.element.getBoundingClientRect().top - this.element.parentElement.getBoundingClientRect().top - this.getBorderSize() - 1;
    this._leftRelPos =
      this.element.getBoundingClientRect().left - this.element.parentElement.getBoundingClientRect().left - this.getBorderSize() - 1;
  }

  private getBorderSize(): number {
    let elStyle = window.getComputedStyle(this.element);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
    return Number(regex.exec(str)[1]);
  }

  private updateElBorderSize() {
    let elStyle = window.getComputedStyle(this.element);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
    this._elBorderSize = Number(regex.exec(str)[1]);
  }
  private updateAreaBorderSize() {
    let elStyle = window.getComputedStyle(this.element);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
    this._areaBorderSize = Number(regex.exec(str)[1]);
  }

  private translateToUI(xPos: number, yPos: number, el: any) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}

export const inspectArea: HTMLDivElement = document.querySelector("#inspect-area-0");
export const zThumb: HTMLDivElement = document.querySelector("#z-thumb");
export const sampleArea: HTMLDivElement = document.querySelector("#sample-area");
export const zSlider: HTMLDivElement = document.querySelector("#z-slider");
export const joyPad: HTMLDivElement = document.querySelector("#joystick-pad");
export const joyThumb: HTMLDivElement = document.querySelector("#joystick-thumb");
export const zSensBtn: HTMLButtonElement = document.querySelector("#z-sens-btn");

export const zSenses: string[] = ["0.1x", "0.5x", "1x"];
