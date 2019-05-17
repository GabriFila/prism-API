"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkLimits(req, res, next) {
    console.info("Checking limits");
    console.log("resource in checklimits: " + res.resource);
    //check if there are errors in request
    if ("errors" in res)
        next();
    else {
        let newValue = req.body.newValue;
        if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max)) {
            res.errors.push(`${newValue} is non valid for ${res.resource.name}`);
        }
    }
}
module.exports = checkLimits;
//# sourceMappingURL=checkLimits.js.map