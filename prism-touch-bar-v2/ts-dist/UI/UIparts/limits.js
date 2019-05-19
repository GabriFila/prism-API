"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanParameteres_1 = require("./scanParameteres");
class Limit {
    constructor(id) {
        this.id = id;
        this.max = Number.POSITIVE_INFINITY;
        this.min = Number.NEGATIVE_INFINITY;
    }
    check(value) {
        return value <= this.max && value >= this.min;
    }
}
exports.limits = [];
scanParameteres_1.UIparameters.forEach(param => exports.limits.push(new Limit(param.id)));
function updateLimits(scanParams) {
    scanParameteres_1.getXYZproperties(scanParams).forEach(prop => {
        //updates limit for each scanParam that as xyz
        exports.limits.find(limit => limit.id == scanParams[prop].x.name).max = scanParams[prop].x.max;
        exports.limits.find(limit => limit.id == scanParams[prop].x.name).min = scanParams[prop].x.min;
        exports.limits.find(limit => limit.id == scanParams[prop].y.name).max = scanParams[prop].y.max;
        exports.limits.find(limit => limit.id == scanParams[prop].y.name).min = scanParams[prop].y.min;
        exports.limits.find(limit => limit.id == scanParams[prop].z.name).max = scanParams[prop].z.max;
        exports.limits.find(limit => limit.id == scanParams[prop].z.name).min = scanParams[prop].z.min;
    });
    exports.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
exports.updateLimits = updateLimits;
//# sourceMappingURL=limits.js.map