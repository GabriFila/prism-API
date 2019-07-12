"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Motors {
}
exports.Motors = Motors;
class State {
    constructor() {
        this.scanParams = new ScanParams();
        this.lasers = [new Laser(), new Laser(), new Laser(), new Laser()];
        this.mode = "stand-by";
    }
}
exports.State = State;
class Laser {
    constructor() {
        this.power = null;
        this.waveLength = null;
        this.isOn = false;
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
    constructor() {
        this.current = null;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
}
//# sourceMappingURL=api-resources.js.map