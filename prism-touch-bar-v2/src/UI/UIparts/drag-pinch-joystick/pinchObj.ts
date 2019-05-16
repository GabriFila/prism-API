import { DragObj } from "./dragObj";
import { MovObj } from "./movObj";

export class PinchObj extends DragObj {
  pinchFactor: number;
  initialPinchDistance: number;
  areaMaxDim: number;
  elMinDim: number;
  pincActive: boolean;

  constructor(element: HTMLDivElement, area: HTMLDivElement, elMinDim: number) {
    super(element, area);
    this.elMinDim = elMinDim;
    this.area.addEventListener("touchstart", this.pinchStart);
    this.area.addEventListener("touchmove", this.pinch);
    this.area.addEventListener("touchend", this.pinchEnd);
  }

  private pinchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      if ((e.touches[0].target === this.area && e.touches[1].target === this.area) || e.touches) {
        if (this.touchingOnlyRightPoints(e, this.element, this.area)) {
          this.dragActive = false;
          this.pincActive = true;
          this.initialPinchDistance = Math.sqrt(
            Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
          );
          this.areaMaxDim = Math.min(
            this.area.getBoundingClientRect().width - 2 * this.areaBorderSize,
            this.area.getBoundingClientRect().height - 2 * this.areaBorderSize
          );
        }
      }
    }
  };

  private pinch = (e: TouchEvent) => {
    if (this.pincActive) {
      e.preventDefault();

      if (e.touches.length === 2) {
        this.pinchFactor =
          Math.sqrt(Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) + Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)) /
          this.initialPinchDistance;

        //limitPinchFactor(this.pinchFactor);
        this.pinchFactor = Math.pow(this.pinchFactor, 1 / 12);

        let aspectRatio = this.elWidth / this.elHeight;
        let newWidth: number = this.elWidth * this.pinchFactor;
        let newHeight: number = this.elHeight * this.pinchFactor;

        if (newWidth > this.areaMaxDim) newWidth = this.areaMaxDim;
        if (newHeight > this.areaMaxDim) newHeight = this.areaMaxDim;

        if (newWidth < this.elMinDim) newWidth = this.elMinDim;
        if (newHeight < this.elMinDim) newHeight = this.elMinDim;

        if (this.pinchFactor > 1) {
          if (this.leftRelPos + newWidth + 2 * this.areaBorderSize > this.areaWidth) {
            newWidth = this.areaWidth - this.leftRelPos;
            newHeight = newWidth / aspectRatio;
          }
          if (this.topRelPos + newHeight + 2 * this.areaBorderSize > this.areaHeight) {
            newHeight = this.areaHeight - this.topRelPos;
            newWidth = newHeight * aspectRatio;
          }
        }

        let newLeftPos = this.leftRelPos - (newWidth - this.elWidth) / 2;
        let newTopPos = this.topRelPos - (newHeight - this.elHeight) / 2;

        if (newLeftPos > 0 && newTopPos > 0) {
          this.leftRelPos = newLeftPos;
          this.topRelPos = newTopPos;
        }
        this.elWidth = newWidth;
        this.elHeight = newHeight;
      }
    }
  };

  private pinchEnd = () => {
    this.pincActive = false;
  };

  private touchingOnlyRightPoints(e: TouchEvent, element: HTMLDivElement, area: HTMLDivElement): boolean {
    return (
      (e.touches[0].target === area && e.touches[1].target === area) ||
      (e.touches[0].target === element && e.touches[1].target === element) ||
      (e.touches[0].target === element && e.touches[1].target === area) ||
      (e.touches[0].target === area && e.touches[1].target === element)
    );
  }
}
