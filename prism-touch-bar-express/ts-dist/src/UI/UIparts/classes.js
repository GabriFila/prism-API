"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Motors {
}
exports.Motors = Motors;
class State {
    constructor() {
        this.scanParams = new ScanParams();
        this.lasers = [new Laser(), new Laser(), new Laser(), new Laser()];
    }
}
exports.State = State;
class Laser {
    constructor() {
        this.power = null;
        this.waveLength = null;
    }
}
class ScanParams {
    constructor() {
        this.offset = new XYZ();
        this.pixelNumber = new XYZ();
        this.range = new XYZ();
        this.dwellTime = null;
    }
}
//for XYZ parameters
class XYZ {
    constructor() {
        this.x = new CurrMaxMin();
        this.y = new CurrMaxMin();
        this.z = new CurrMaxMin();
    }
}
//Current Value, Max Value, Min Value
class CurrMaxMin {
    get current() {
        return this._current;
    }
    set current(value) {
        this._current = value;
    }
    constructor() {
        this._current = null;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.POSITIVE_INFINITY;
    }
}
//# sourceMappingURL=classes.js.map