export abstract class MovObj {
  public element: HTMLDivElement;
  public area: HTMLDivElement;

  private _elWidth: number;
  public get elWidth(): number {
    return this._elWidth;
  }
  public set elWidth(value: number) {
    this.element.style.width = String(value) + "px";
    this._elWidth = value;
  }

  private _elHeight: number;
  public get elHeight(): number {
    return this._elHeight;
  }
  public set elHeight(value: number) {
    this.element.style.height = String(value) + "px";
    this._elHeight = value;
  }

  private _areaWidth: number;
  public get areaWidth(): number {
    return this._areaWidth;
  }

  private _areaHeight: number;
  public get areaHeight(): number {
    return this._areaHeight;
  }

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
    this.updateInfos();
    window.addEventListener("resize", () => this.updateInfos());
  }
  private updateInfos() {
    this.updateElBorderSize();
    this.updateAreaBorderSize();
    this.updateWidthHeight();
    this.updateTopLeftRelPos();
  }

  private updateTopLeftRelPos() {
    this._topRelPos =
      this.element.getBoundingClientRect().top - this.element.parentElement.getBoundingClientRect().top - this.elBorderSize - 1;
    this._leftRelPos =
      this.element.getBoundingClientRect().left - this.element.parentElement.getBoundingClientRect().left - this.elBorderSize - 1;
  }

  private updateWidthHeight() {
    this._elWidth = this.element.getBoundingClientRect().width;
    this._elHeight = this.element.getBoundingClientRect().height;
    this._areaWidth = this.area.getBoundingClientRect().width;
    this._areaHeight = this.area.getBoundingClientRect().height;
  }

  private updateElBorderSize() {
    let elStyle = window.getComputedStyle(this.element);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
    this._elBorderSize = Number(regex.exec(str)[1]);
  }
  private updateAreaBorderSize() {
    let areaStyle = window.getComputedStyle(this.area);
    let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
    let str = areaStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
    this._areaBorderSize = Number(regex.exec(str)[1]);
  }

  private translateToUI(xPos: number, yPos: number, el: any) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}
