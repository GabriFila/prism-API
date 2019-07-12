"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*mode btns  initialization */
exports.liveBtn = document.querySelector("#live-btn");
exports.captureBtn = document.querySelector("#capture-btn");
exports.stackBtn = document.querySelector("#stack-btn");
exports.modeBtns = [exports.liveBtn, exports.captureBtn, exports.stackBtn];
function updateMode(newMode) {
    exports.currentMode = newMode;
    exports.modeBtns.forEach(btn => btn.classList.remove("highlighted-button"));
    let higlightBtn;
    switch (exports.currentMode) {
        case "live":
            higlightBtn = exports.liveBtn;
            break;
        case "capture":
            higlightBtn = exports.captureBtn;
            break;
        case "stack":
            higlightBtn = exports.stackBtn;
            break;
        default:
            higlightBtn = null;
            break;
    }
    if (higlightBtn != null)
        higlightBtn.classList.add("highlighted-button");
}
exports.updateMode = updateMode;
//# sourceMappingURL=mode.js.map