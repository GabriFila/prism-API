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
        console.log(scanParams[prop]);
        exports.limits.find(limit => limit.id == scanParams[prop].x.id).max = scanParams[prop].x.max;
        exports.limits.find(limit => limit.id == scanParams[prop].x.id).min = scanParams[prop].x.min;
        exports.limits.find(limit => limit.id == scanParams[prop].y.id).max = scanParams[prop].y.max;
        exports.limits.find(limit => limit.id == scanParams[prop].y.id).min = scanParams[prop].y.min;
        exports.limits.find(limit => limit.id == scanParams[prop].z.id).max = scanParams[prop].z.max;
        exports.limits.find(limit => limit.id == scanParams[prop].z.id).min = scanParams[prop].z.min;
    });
    exports.limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
exports.updateLimits = updateLimits;
//# sourceMappingURL=limits.js.map