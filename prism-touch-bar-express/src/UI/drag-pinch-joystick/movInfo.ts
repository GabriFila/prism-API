class RelPosInfo {
  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(top: number, right: number, bottom: number, left: number) {
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.top = top;
  }
}

export abstract class MovInfo {
  element: HTMLDivElement;
  area: HTMLDivElement;
  active: boolean;

  constructor(element: HTMLDivElement, area: HTMLDivElement) {
    this.element = element;
    this.area = area;
    this.active = false;
    this.getBorderSize();
    this.getRelPos();
  }

  private _borderSize: number;
  public get borderSize(): number {
    this.getBorderSize();
    return this._borderSize;
  }

  private _relPos: RelPosInfo;
  public get relPos(): RelPosInfo {
    this.getRelPos();
    return this._relPos;
  }

  setRelPosTop(top: number) {
    this._relPos.top = top;
    translateToUI(this._relPos.left, top, this.element);
  }

  setRelPosLeft(left: number) {
    this._relPos.left = left;
    translateToUI(left, this._relPos.top, this.element);
  }

  private getBorderSize() {
    let elStyle = window.getComputedStyle(this.element);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
    this._borderSize = Number(regex.exec(str)[1]);
  }

  private getRelPos() {
    this._relPos = new RelPosInfo(
      this.element.getBoundingClientRect().top -
        this.element.parentElement.getBoundingClientRect().top -
        getBorderSize(this.element) -
        1,
      this.element.getBoundingClientRect().right -
        this.element.parentElement.getBoundingClientRect().right -
        getBorderSize(this.element) -
        1,
      this.element.getBoundingClientRect().bottom -
        this.element.parentElement.getBoundingClientRect().bottom -
        getBorderSize(this.element) -
        1,
      this.element.getBoundingClientRect().left -
        this.element.parentElement.getBoundingClientRect().left -
        getBorderSize(this.element) -
        1
    );
  }
}

export const inspectArea: HTMLDivElement = document.querySelector("#inspect-area-0");
export const sampleArea: HTMLDivElement = document.querySelector("#sample-area");
export const joyPad: HTMLDivElement = document.querySelector("#joystick-pad");
export const joyThumb: HTMLDivElement = document.querySelector("#joystick-thumb");

export const zThumb: HTMLDivElement = document.querySelector("#z-thumb");
export const zSlider: HTMLDivElement = document.querySelector("#z-slider");
export const zSensBtn: HTMLButtonElement = document.querySelector("#z-sens-btn");
export const zSenses: string[] = ["0.1x", "0.5x", "1x"];

export function getBorderSize(el: HTMLElement): number {
  let elStyle = window.getComputedStyle(el);
  let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
  let str = elStyle.getPropertyValue("border"); //gets rid of "px" in height CSS property

  return Number(regex.exec(str)[1]);
}

export function getRelPos(el: HTMLElement): RelPosInfo {
  return new RelPosInfo(
    el.getBoundingClientRect().top - el.parentElement.getBoundingClientRect().top - getBorderSize(el) - 1,
    el.getBoundingClientRect().right - el.parentElement.getBoundingClientRect().right - getBorderSize(el) - 1,
    el.getBoundingClientRect().bottom - el.parentElement.getBoundingClientRect().bottom - getBorderSize(el) - 1,
    el.getBoundingClientRect().left - el.parentElement.getBoundingClientRect().left - getBorderSize(el) - 1
  );
}

export function translateToUI(xPos: number, yPos: number, el: any) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
