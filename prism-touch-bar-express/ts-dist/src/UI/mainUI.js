"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*slider initialization*/
const lasers_1 = require("./initializations/lasers");
/*numpad initialization*/
const numpad_1 = require("./initializations/numpad");
/*parameters initialization*/
const scanParameteres_1 = require("./initializations/scanParameteres");
/*drag capabilties*/
const drag_1 = require("./drag-pinch-joystick/drag");
/*pinch capabilties*/
const pinch_1 = require("./drag-pinch-joystick/pinch");
/*joystick capabilties*/
const joystick_1 = require("./drag-pinch-joystick/joystick");
/*z slider sensitivity */
const movInfo_1 = require("./drag-pinch-joystick/movInfo");
const classes_1 = require("./initializations/classes");
/*last item in focus*/
let lastFocus = undefined;
/*start btn  initialization */
const liveBtn = document.querySelector("#live-btn");
const captureBtn = document.querySelector("#capture-btn");
const stackBtn = document.querySelector("#stack-btn");
let state = new classes_1.State();
prepareUI();
liveBtn.addEventListener("click", () => {
    fetch("/prism-state/scan-param");
});
document.body.addEventListener("click", function (e) {
    //removes highlight border only when not touching numpad
    if (numpad_1.numPad.filter(numBtn => numBtn === e.target).length == 0) {
        if (e.target !== numpad_1.delBtn && e.target !== numpad_1.dotBtn)
            if (scanParameteres_1.parameters.filter(param => param === e.target).length == 0) {
                removeHighlithBoder();
                lastFocus = null;
            }
    }
    //set parameter UI value to 0 when is empty
    scanParameteres_1.parameters.forEach(param => {
        if (param != lastFocus)
            if (param.value == "") {
                param.value = "0";
            }
    });
});
/*open window to add preset */
scanParameteres_1.addPresetBtn.addEventListener("click", () => {
    //open preset window
});
/*fires when add preset window is closed
ipcHome.on("added-preset", (event: IpcMessageEvent, presetName: string) => {
    let option = document.createElement("option");
    option.text = presetName;
    presetSelector.add(option);
    presets.push(new Preset(presetName, state));
})
*/
/*choose preset*/
scanParameteres_1.presetSelector.addEventListener("change", () => {
    //  state = presets.find(preset => preset.name === presetSelector.selectedOptions[0].text).param;
});
/*add laser slider move event */
lasers_1.laserSliders.forEach((slider, i) => {
    slider.oninput = function () {
        let tempValue = slider.value;
        lasers_1.laserPowers[i].innerHTML = tempValue + "%";
        //  state.lasers[i].power = Number(tempValue);
    };
});
/*turn on/off lasers */
lasers_1.laserOnOffBtns.forEach((sliderBtn, i) => {
    sliderBtn.addEventListener("click", () => {
        state.lasers[i].isOn = !state.lasers[i].isOn;
        if (state.lasers[i].isOn)
            lasers_1.laserOn(i);
        else
            lasers_1.laserOff(i);
    });
});
/*store last element in focus of paramentres input*/
scanParameteres_1.parameters.forEach(param => {
    param.addEventListener("click", () => {
        removeHighlithBoder();
        lastFocus = param;
        param.value = "";
        param.classList.add("highlighted");
        scanParameteres_1.sendParamChange(param);
    });
});
/*input numpad value in last focus element*/
numpad_1.numPad.forEach((numBtn, i) => {
    numBtn.addEventListener("click", () => {
        if (lastFocus != null) {
            lastFocus.classList.add("highlighted");
            lastFocus.value += i;
            scanParameteres_1.sendParamChange(lastFocus);
        }
    });
});
/*add dot to last focus element when dot button pressed */
numpad_1.dotBtn.addEventListener("click", () => {
    if (lastFocus !== null && lastFocus.value.slice(-1) !== "." && lastFocus.value.length != 0) {
        lastFocus.classList.add("highlighted");
        lastFocus.value += ".";
    }
});
/*delet number to last focus element when dot button pressed */
numpad_1.delBtn.addEventListener("click", () => {
    if (lastFocus != null) {
        lastFocus.classList.add("highlighted");
        lastFocus.value = lastFocus.value.slice(0, -1); /*remove last character */
        scanParameteres_1.sendParamChange(lastFocus);
    }
});
/*add dragable capabilities*/
drag_1.dragInfos.forEach(info => {
    info.area.addEventListener("touchstart", drag_1.dragStart);
    info.area.addEventListener("touchmove", drag_1.drag);
    info.area.addEventListener("touchend", drag_1.dragEnd);
    info.area.addEventListener("mousedown", drag_1.dragStart);
    info.area.addEventListener("mousemove", drag_1.drag);
    info.area.addEventListener("mouseup", drag_1.dragEnd);
});
/*add pinchable capabilities*/
pinch_1.pinchInfos.forEach(info => {
    info.pinchArea.addEventListener("touchstart", pinch_1.pinchStart);
    info.pinchArea.addEventListener("touchmove", pinch_1.pinch);
    info.pinchArea.addEventListener("touchend", pinch_1.pinchEnd);
});
joystick_1.joystickInfos.forEach(info => {
    info.area.addEventListener("touchstart", joystick_1.joyStart);
    info.area.addEventListener("touchmove", joystick_1.joyMove);
    info.area.addEventListener("touchend", joystick_1.joyEnd);
    info.area.addEventListener("mousedown", joystick_1.joyStart);
    info.area.addEventListener("mousemove", joystick_1.joyMove);
    info.area.addEventListener("mouseup", joystick_1.joyEnd);
});
movInfo_1.zSensBtn.addEventListener("click", () => {
    movInfo_1.zSensBtn.innerHTML = movInfo_1.zSenses[(movInfo_1.zSenses.indexOf(movInfo_1.zSensBtn.innerHTML) + 1) % movInfo_1.zSenses.length];
});
function removeHighlithBoder() {
    scanParameteres_1.parameters
        .filter(param => param.classList.contains("highlighted"))
        .forEach(param => param.classList.remove("highlighted"));
}
function prepareUI() {
    lasers_1.laserSliders.forEach(slider => {
        slider.disabled = true;
        slider.classList.add("grayed-out");
    });
    lasers_1.laserOnOffBtns.forEach(sliderBtn => sliderBtn.classList.add("laser-btn-off"));
    lasers_1.laserWaveLengths.forEach(sliderColor => sliderColor.classList.add("grayed-out"));
    lasers_1.laserPowers.forEach(sliderValue => sliderValue.classList.add("grayed-out"));
    scanParameteres_1.parameters.forEach(parameter => (parameter.value = "0"));
    movInfo_1.zSensBtn.innerHTML = movInfo_1.zSenses[0];
}
setInterval(getCurrentState, 200);
//getCurrentState();
function getCurrentState() {
    fetch("/prism-state/")
        .then(res => res.json())
        .then(newState => (state = newState))
        .then(updateUIParameters)
        .then(updateUILasers);
}
function updateUIParameters() {
    scanParameteres_1.parameters[0].value = state.scanParams.offset.x.current.toString();
    scanParameteres_1.parameters[1].value = state.scanParams.offset.y.current.toString();
    scanParameteres_1.parameters[2].value = state.scanParams.offset.z.current.toString();
    scanParameteres_1.parameters[3].value = state.scanParams.pixelNumber.x.current.toString();
    scanParameteres_1.parameters[4].value = state.scanParams.pixelNumber.y.current.toString();
    scanParameteres_1.parameters[5].value = state.scanParams.pixelNumber.z.current.toString();
    scanParameteres_1.parameters[6].value = state.scanParams.range.x.current.toString();
    scanParameteres_1.parameters[7].value = state.scanParams.range.y.current.toString();
    scanParameteres_1.parameters[8].value = state.scanParams.range.z.current.toString();
    scanParameteres_1.parameters[9].value = state.scanParams.dwellTime.toString();
}
function updateUILasers() {
    console.log(state.lasers);
    state.lasers.forEach((stateLaser, i) => {
        lasers_1.laserPowers[i].innerHTML = stateLaser.power.toString();
        lasers_1.laserSliders[i].value = state.lasers[i].power.toString();
        if (state.lasers[i].isOn)
            lasers_1.laserOn(i);
        else
            lasers_1.laserOff(i);
        lasers_1.laserWaveLengths[i].innerHTML = stateLaser.waveLength.toString();
    });
}
function updateUIPads() {
    drag_1.dragInfos[0].relPos.left = state.scanParams.offset.x.current;
    drag_1.dragInfos[0].relPos.top = state.scanParams.offset.y.current;
}
//# sourceMappingURL=mainUI.js.map