import { getBorderSize, getRelPos, translateToUI } from "./movInfo"
import { sampleArea } from "./movInfo"
import { inspectArea } from "./movInfo"

class PinchInfo {
    pinchELement: HTMLDivElement;
    pinchArea: HTMLDivElement;
    pinchFactor: number;
    initialPinchDistance: number;
    areaMaxDim: number;
    elMinDim: number;
    pinchActive: boolean;

    constructor(pinchElement: HTMLDivElement, pinchArea: HTMLDivElement, elMinDim: number) {
        this.pinchELement = pinchElement;
        this.pinchArea = pinchArea;
        this.pinchActive = false;
        this.elMinDim = elMinDim;
    }
}

export const pinchInfos: PinchInfo[] = [new PinchInfo(inspectArea, sampleArea, 40)];

export function pinchStart(e: TouchEvent) {
    pinchInfos.forEach(info => {
        if (e.touches.length === 2) {
            if (e.touches[0].target === info.pinchArea && e.touches[1].target === info.pinchArea ||
                e.touches) {
                if (touchingOnlyRightPoints(e, info.pinchELement, info.pinchArea)) {
                    info.pinchActive = true;
                    info.initialPinchDistance = Math.sqrt(
                        Math.pow((e).touches[0].clientX - (e).touches[1].clientX, 2)
                        + Math.pow((e).touches[0].clientY - (e).touches[1].clientY, 2));
                    info.areaMaxDim = Math.min(info.pinchArea.getBoundingClientRect().width - 2 * getBorderSize(info.pinchArea),
                        info.pinchArea.getBoundingClientRect().height - 2 * getBorderSize(info.pinchArea));
                }
            }
        }
    })
}

export function pinch(e: TouchEvent) {
    pinchInfos.forEach((info, index) => {
        if (info.pinchActive) {
            e.preventDefault();

            if (e.touches.length === 2) {
                info.pinchFactor = Math.sqrt(Math.pow((e).touches[0].clientX - (e).touches[1].clientX, 2)
                    + Math.pow((e).touches[0].clientY - (e).touches[1].clientY, 2))
                    / info.initialPinchDistance;

                //limitPinchFactor(info.pinchFactor);
                info.pinchFactor = Math.pow(info.pinchFactor, 1 / 8);

                let newWidth: number = info.pinchELement.getBoundingClientRect().width * info.pinchFactor;
                let newHeight: number = info.pinchELement.getBoundingClientRect().height * info.pinchFactor;

                if (newWidth > info.areaMaxDim)
                    newWidth = info.areaMaxDim;
                if (newHeight > info.areaMaxDim)
                    newHeight = info.areaMaxDim;

                if (newWidth < info.elMinDim)
                    newWidth = info.elMinDim;
                if (newHeight < info.elMinDim)
                    newHeight = info.elMinDim;

                info.pinchELement.style.width = String(newWidth) + "px";
                info.pinchELement.style.height = String(newHeight) + "px";
            }
        }
    })
}

export function pinchEnd() {
    pinchInfos.forEach(info => { info.pinchActive = false })
}

//Checks if user is only touching the element to pinch and/or the area where to pinch it
function touchingOnlyRightPoints(e: TouchEvent, element: HTMLDivElement, area: HTMLDivElement): boolean {
    return e.touches[0].target === area && e.touches[1].target === area ||
        e.touches[0].target === element && e.touches[1].target === element ||
        e.touches[0].target === element && e.touches[1].target === area ||
        e.touches[0].target === area && e.touches[1].target === element;
}