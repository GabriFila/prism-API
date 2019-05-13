import { DragObj } from "./dragObj";

export class CircJoystickObj extends DragObj {
  element: HTMLDivElement;
  area: HTMLDivElement;
  joyActive: boolean;
  initialX: number;
  initialY: number;
  relCenterX: number;
  relCenterY: number;

  mag: number;
  arg: number;
  maxMag: number;

  constructor(element: HTMLDivElement, area: HTMLDivElement) {
    super(element, area);
    this.updateCenter();
    this.moveToCenter();
    this.updateMaxMag();
    this.area.addEventListener("touchstart", this.joyStart);
    this.area.addEventListener("mousedown", this.joyStart);
    this.area.addEventListener("touchmove", this.joyMove);
    this.area.addEventListener("mousemove", this.joyMove);
    this.area.addEventListener("touchend", this.joyEnd);
    this.area.addEventListener("mouseup", this.joyEnd);
    window.addEventListener("resize", () => {
      this.updateCenter();
      this.moveToCenter();
      this.updateMaxMag();
    });
  }

  private setPolar(left: number, top: number) {
    let a = left - this.relCenterX;
    let b = -(top - this.relCenterY);
    this.mag = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    if (a >= 0) this.arg = Math.atan(b / a);
    else this.arg = Math.atan(b / a) + Math.PI;

    if (this.mag >= this.maxMag) this.mag = this.maxMag;
    let newLeft: number = this.relCenterX + this.mag * Math.cos(this.arg);
    let newTop: number = this.relCenterY - this.mag * Math.sin(this.arg);
    this.leftRelPos = newLeft;
    this.topRelPos = newTop;
  }
  private updateCenter() {
    this.relCenterX = this.areaWidth / 2 - this.elWidth / 2 - this.areaBorderSize;
    this.relCenterY = this.areaHeight / 2 - this.elHeight / 2 - this.areaBorderSize;
  }

  private moveToCenter() {
    this.topRelPos = this.relCenterY;
    this.leftRelPos = this.relCenterX;
  }

  private updateMaxMag() {
    if (this.areaWidth <= this.areaHeight) this.maxMag = 0.9 * (this.areaWidth / 2 - this.elWidth / 2 - this.elBorderSize);
    else this.maxMag = 0.9 * (this.areaHeight / 2 - this.elHeight / 2 - this.elBorderSize);
  }

  private joyStart = (e: TouchEvent | MouseEvent) => {
    if (e.target === this.element) {
      this.joyActive = true;
      //set start position
      if (e.type === "touchstart") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          this.initialX = eTouch.touches[0].clientX - this.relCenterX;
          this.initialY = eTouch.touches[0].clientY - this.relCenterY;
        }
      } else {
        this.initialX = (e as MouseEvent).clientX - this.relCenterX;
        this.initialY = (e as MouseEvent).clientY - this.relCenterY;
      }
      this.element.classList.remove("smooth-transition");
    }
  };

  private joyMove = (e: TouchEvent | MouseEvent) => {
    //if user is touching
    if (this.joyActive) {
      let currentX;
      let currentY;
      e.preventDefault();
      //set offset position relative to top-left of draggable area
      if (e.type === "touchmove") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          currentX = eTouch.touches[0].clientX - this.initialX;
          currentY = eTouch.touches[0].clientY - this.initialY;
        }
      } else {
        currentX = (e as MouseEvent).clientX - this.initialX;
        currentY = (e as MouseEvent).clientY - this.initialY;
      }

      this.setPolar(currentX, currentY);
    }
  };

  private joyEnd = (e: TouchEvent | MouseEvent) => {
    this.moveToCenter();
    this.joyActive = false;
    this.element.classList.add("smooth-transition");
  };
}
