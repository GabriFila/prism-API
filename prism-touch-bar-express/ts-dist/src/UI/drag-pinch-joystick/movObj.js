"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MovObj {
    get elBorderSize() {
        return this._elBorderSize;
    }
    get areaBorderSize() {
        return this._areaBorderSize;
    }
    get topRelPos() {
        return this._topRelPos;
    }
    set topRelPos(value) {
        this._topRelPos = value;
        this.translateToUI(this._leftRelPos, this._topRelPos, this.element);
    }
    get leftRelPos() {
        return this._leftRelPos;
    }
    set leftRelPos(value) {
        this._leftRelPos = value;
        this.translateToUI(this._leftRelPos, this.topRelPos, this.element);
    }
    constructor(element, area) {
        this.element = element;
        this.area = area;
        this.active = false;
        this.updateElBorderSize();
        this.updateAreaBorderSize();
        this.updateTopLeftRelPos();
    }
    updateTopLeftRelPos() {
        this._topRelPos =
            this.element.getBoundingClientRect().top - this.element.parentElement.getBoundingClientRect().top - this.getBorderSize() - 1;
        this._leftRelPos =
            this.element.getBoundingClientRect().left - this.element.parentElement.getBoundingClientRect().left - this.getBorderSize() - 1;
    }
    getBorderSize() {
        let elStyle = window.getComputedStyle(this.element);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        return Number(regex.exec(str)[1]);
    }
    updateElBorderSize() {
        let elStyle = window.getComputedStyle(this.element);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        this._elBorderSize = Number(regex.exec(str)[1]);
    }
    updateAreaBorderSize() {
        let elStyle = window.getComputedStyle(this.element);
        let regex = /([0-9]*)px[a-zA-Z0-9_ ]*/;
        let str = elStyle.getPropertyValue("border"); //gets rid of "px" in border CSS property
        this._areaBorderSize = Number(regex.exec(str)[1]);
    }
    translateToUI(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}
exports.MovObj = MovObj;
exports.inspectArea = document.querySelector("#inspect-area-0");
exports.zThumb = document.querySelector("#z-thumb");
exports.sampleArea = document.querySelector("#sample-area");
exports.zSlider = document.querySelector("#z-slider");
exports.joyPad = document.querySelector("#joystick-pad");
exports.joyThumb = document.querySelector("#joystick-thumb");
exports.zSensBtn = document.querySelector("#z-sens-btn");
exports.zSenses = ["0.1x", "0.5x", "1x"];
//# sourceMappingURL=movObj.js.map