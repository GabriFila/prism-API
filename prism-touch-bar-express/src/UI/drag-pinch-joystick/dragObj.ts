import { MovObj } from "./movObj";

export class DragObj extends MovObj {
  initialX: number;
  initialY: number;

  constructor(element: HTMLDivElement, area: HTMLDivElement) {
    super(element, area);
    this.area.addEventListener("mousedown", this.dragStart);
    this.area.addEventListener("touchstart", this.dragStart);
    this.area.addEventListener("mousemove", this.drag);
    this.area.addEventListener("touchmove", this.drag);
    this.area.addEventListener("mouseup", this.dragEnd);
    this.area.addEventListener("touchend", this.dragEnd);
  }

  private dragStart = (e: TouchEvent | MouseEvent) => {
    if (e.target === this.element) {
      this.active = true;
      //set start position
      if (e.type === "touchstart") {
        let eTouch = e as TouchEvent;
        if (eTouch.touches.length === 1) {
          this.initialX = eTouch.touches[0].clientX - this.leftRelPos;
          this.initialY = eTouch.touches[0].clientY - this.topRelPos;
        }
      } else {
        this.initialX = (e as MouseEvent).clientX - this.leftRelPos;
        this.initialY = (e as MouseEvent).clientY - this.topRelPos;
      }
    }
  };

  private drag = (e: TouchEvent | MouseEvent) => {
    //if user is touching
    if (this.active) {
      e.preventDefault();
      let currentX;
      let currentY;
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

      //stops movable element from going outside the draggable area when dragging it
      let areaWidth: number = this.area.getBoundingClientRect().width;
      let dragElWidth: number = this.element.getBoundingClientRect().width;
      let areaHeight: number = this.area.getBoundingClientRect().height;
      let dragElHeight: number = this.element.getBoundingClientRect().height;
      let dragAreaBorderSize: number = this.areaBorderSize;

      if (currentX + dragElWidth + 2 * dragAreaBorderSize > areaWidth) currentX = areaWidth - dragElWidth - 2 * dragAreaBorderSize;
      if (currentX < 0) currentX = 0;
      if (currentY + dragElHeight + 2 * dragAreaBorderSize > areaHeight) currentY = areaHeight - dragElHeight - 2 * dragAreaBorderSize;
      if (currentY < 0) currentY = 0;

      /*
      if (currentX + this.elWidth + this.areaBorderSize > this.areaHeight) currentX = this.areaWidth - this.elWidth - this.areaBorderSize;
      if (currentX < 0) currentX = 0;
      if (currentY + this.elHeight + this.areaBorderSize > this.areaHeight)
        currentY = this.areaHeight - this.elHeight - this.areaBorderSize;
      if (currentY < 0) currentY = 0;
*/

      this.leftRelPos = currentX;
      this.topRelPos = currentY;
    }
  };

  private dragEnd = (e: TouchEvent | MouseEvent) => {
    this.active = false;
  };
}
