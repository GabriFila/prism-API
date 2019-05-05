
import { getBorderSize, getRelPos, MovInfo,translateToUI } from "./movInfo"
import { sampleArea, zSlider } from "./movInfo"
import { inspectArea, zThumb } from "./movInfo"


class DragInfo extends MovInfo {
    initialX: number;
    initialY: number;

    constructor(element: HTMLDivElement, area: HTMLDivElement) {
        super(element, area);
    }
}


export const dragInfos: DragInfo[] = [new DragInfo(inspectArea, sampleArea)]

export function dragStart(e: TouchEvent | MouseEvent) {

    dragInfos.forEach((info) => {

        if (e.target === info.element) {
            info.active = true;
            //set start position
            if (e.type === "touchstart") {
                let eTouch = e as TouchEvent;
                if ((eTouch).touches.length === 1) {
                    info.initialX = (eTouch).touches[0].clientX - info.relPos.left;
                    info.initialY = (eTouch).touches[0].clientY - info.relPos.top;

                }
            } else {
                info.initialX = (e as MouseEvent).clientX - info.relPos.left;
                info.initialY = (e as MouseEvent).clientY - info.relPos.top;
            }
        }
    })
}

export function drag(e: TouchEvent | MouseEvent) {

    dragInfos.forEach((info) => {
        //if user is touching
        if (info.active) {

            e.preventDefault();
            let currentX;
            let currentY;
            //set offset position relative to top-left of draggable area
            if (e.type === "touchmove") {
                let eTouch = e as TouchEvent;
                if ((eTouch).touches.length === 1) {

                    currentX = (eTouch).touches[0].clientX - info.initialX;
                    currentY = (eTouch).touches[0].clientY - info.initialY;
                }
            } else {
                currentX = (e as MouseEvent).clientX - info.initialX;
                currentY = (e as MouseEvent).clientY - info.initialY;
            }

            //stops movable element from going outside the draggable area when dragging it
            let areaWidth: number = info.area.getBoundingClientRect().width;
            let dragElWidth: number = info.element.getBoundingClientRect().width;
            let areaHeight: number = info.area.getBoundingClientRect().height;
            let dragElHeight: number = info.element.getBoundingClientRect().height;
            let dragAreaBorderSize: number = getBorderSize(info.area);

            if (currentX + dragElWidth + 2 * dragAreaBorderSize > areaWidth)
                currentX = areaWidth - dragElWidth - 2 * dragAreaBorderSize;
            if (currentX < 0)
                currentX = 0;
            if (currentY + dragElHeight + 2 * dragAreaBorderSize > areaHeight)
                currentY = areaHeight - dragElHeight - 2 * dragAreaBorderSize;
            if (currentY < 0)
                currentY = 0;

            info.setRelPosLeft(currentX);
            info.setRelPosTop(currentY);

            //translateToUI(currentX, currentY, info.element);

        }
    })

};

export function dragEnd(e: TouchEvent | MouseEvent) {
    dragInfos.forEach((info) => info.active = false);
}
