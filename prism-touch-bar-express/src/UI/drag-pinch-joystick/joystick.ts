import { getBorderSize, translateToUI, MovInfo } from "./movInfo"
import { zSlider, zThumb } from "./movInfo"
import { joyPad, joyThumb } from "./movInfo"


class JoystickInfo extends MovInfo {
    element: HTMLDivElement;
    area: HTMLDivElement;
    active: boolean;
    initialX: number;
    initialY: number;
    defaultX: number;
    defaultY: number;

    constructor(element: HTMLDivElement, area: HTMLDivElement) {
        super(element, area)
        this.setDefaultXY();
        this.moveToDefaultXY();
    }

    setDefaultXY() {
        this.defaultX = this.area.getBoundingClientRect().width / 2 - this.element.getBoundingClientRect().width / 2 - getBorderSize(this.area);
        this.defaultY = this.area.getBoundingClientRect().height / 2 - this.element.getBoundingClientRect().height / 2 - getBorderSize(this.area);
    }

    moveToDefaultXY() {
        this.setRelPosTop(this.defaultY);
        this.setRelPosLeft(this.defaultX);
    }
}

export const joystickInfos: JoystickInfo[] = [new JoystickInfo(joyThumb, joyPad), new JoystickInfo(zThumb, zSlider)];

export function joyStart(e: TouchEvent | MouseEvent) {

    joystickInfos.forEach((info) => {

        if (e.target === info.element) {
            info.active = true;
            //set start position
            if (e.type === "touchstart") {
                let eTouch = e as TouchEvent;
                if ((eTouch).touches.length === 1) {
                    info.initialX = (eTouch).touches[0].clientX - info.defaultX;
                    info.initialY = (eTouch).touches[0].clientY - info.defaultY;

                }
            } else {
                info.initialX = (e as MouseEvent).clientX - info.defaultX;
                info.initialY = (e as MouseEvent).clientY - info.defaultY;
            }
            info.setDefaultXY();
            info.element.classList.remove("smooth-transition");

        }
    })
}


export function joyMove(e: TouchEvent | MouseEvent) {

    joystickInfos.forEach((info) => {
        //if user is touching
        if (info.active) {


            let xOffset;
            let yOffset;
            e.preventDefault();
            //set offset position relative to top-left of draggable area
            if (e.type === "touchmove") {
                let eTouch = e as TouchEvent;
                if ((eTouch).touches.length === 1) {

                    xOffset = (eTouch).touches[0].clientX - info.initialX;
                    yOffset = (eTouch).touches[0].clientY - info.initialY;
                }
            } else {
                xOffset = (e as MouseEvent).clientX - info.initialX;
                yOffset = (e as MouseEvent).clientY - info.initialY;
            }

            //stops movable element from going outside the draggable area when dragging it
            let areaWidth: number = info.area.getBoundingClientRect().width;
            let dragElWidth: number = info.element.getBoundingClientRect().width;
            let areaHeight: number = info.area.getBoundingClientRect().height;
            let dragElHeight: number = info.element.getBoundingClientRect().height;
            let padAreaBorderSize: number = getBorderSize(info.area);

            if (xOffset + dragElWidth + 2 * padAreaBorderSize > areaWidth)
                xOffset = areaWidth - dragElWidth - 2 * padAreaBorderSize;
            if (xOffset < 0)
                xOffset = 0;
            if (yOffset + dragElHeight + 2 * padAreaBorderSize > areaHeight)
                yOffset = areaHeight - dragElHeight - 2 * padAreaBorderSize;
            if (yOffset < 0)
                yOffset = 0;


            translateToUI(xOffset, yOffset, info.element);
        }
    })

};

export function joyEnd(e: TouchEvent | MouseEvent) {
    joystickInfos.forEach((info) => {
        info.moveToDefaultXY();
        info.active = false
        info.element.classList.add("smooth-transition");
    });

}

