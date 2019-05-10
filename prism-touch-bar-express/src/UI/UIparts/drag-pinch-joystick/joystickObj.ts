import { MovObj } from "./movObj";

export class SliderJoystickObj extends MovObj {
  element: HTMLDivElement;
  area: HTMLDivElement;
  joyActive: boolean;
  initialX: number;
  initialY: number;
  centerX: number;
  centerY: number;

  constructor(element: HTMLDivElement, area: HTMLDivElement) {
    super(element, area);
    this.setCenter();
    this.moveToCenter();
    this.area.addEventListener("touchstart", this.joyStart);
    this.area.addEventListener("mousedown", this.joyStart);
    this.area.addEventListener("touchmove", this.joyMove);
    this.area.addEventListener("mousemove", this.joyMove);
    this.area.addEventListener("touchend", this.joyEnd);
    this.area.addEventListener("mouseup", this.joyEnd);
    window.addEventListener("resize", () => {
      this.setCenter();
      this.moveToCenter();
    });
  }

  setCenter() {
    this.centerX = this.area.getBoundingClientRect().width / 2 - this.element.getBoundingClientRect().width / 2 - this.areaBorderSize;
    this.centerY = this.area.getBoundingClientRect().height / 2 - this.element.getBoundingClientRect().height / 2 - this.areaBorderSize;
  }

  moveToCenter() {
    this.topRelPos = this.centerY;
    this.leftRelPos = this.centerX;
  }

  private joyStart = (e: TouchEvent | MouseEvent) => {
    if (e.target === this.element) {
      this.joyActive = true;
      //set start position
      if (e.type === "touchstart") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          this.initialX = eTouch.touches[0].clientX - this.centerX;
          this.initialY = eTouch.touches[0].clientY - this.centerY;
        }
      } else {
        this.initialX = (e as MouseEvent).clientX - this.centerX;
        this.initialY = (e as MouseEvent).clientY - this.centerY;
      }
      this.setCenter();
      this.element.classList.remove("smooth-transition");
    }
  };

  private joyMove = (e: TouchEvent | MouseEvent) => {
    //if user is touching
    if (this.joyActive) {
      let xOffset;
      let yOffset;
      e.preventDefault();
      //set offset position relative to top-left of draggable area
      if (e.type === "touchmove") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          xOffset = eTouch.touches[0].clientX - this.initialX;
          yOffset = eTouch.touches[0].clientY - this.initialY;
        }
      } else {
        xOffset = (e as MouseEvent).clientX - this.initialX;
        yOffset = (e as MouseEvent).clientY - this.initialY;
      }

      //stops movable element from going outside the draggable area when dragging it
      let areaWidth: number = this.area.getBoundingClientRect().width;
      let dragElWidth: number = this.element.getBoundingClientRect().width;
      let areaHeight: number = this.area.getBoundingClientRect().height;
      let dragElHeight: number = this.element.getBoundingClientRect().height;
      let padAreaBorderSize: number = this.areaBorderSize;

      if (xOffset + dragElWidth + 2 * padAreaBorderSize > areaWidth) xOffset = areaWidth - dragElWidth - 2 * padAreaBorderSize;
      if (xOffset < 0) xOffset = 0;
      if (yOffset + dragElHeight + 2 * padAreaBorderSize > areaHeight) yOffset = areaHeight - dragElHeight - 2 * padAreaBorderSize;
      if (yOffset < 0) yOffset = 0;

      this.leftRelPos = xOffset;
      this.topRelPos = yOffset;
    }
  };

  private joyEnd = (e: TouchEvent | MouseEvent) => {
    this.moveToCenter();
    this.joyActive = false;
    this.element.classList.add("smooth-transition");
  };
}
