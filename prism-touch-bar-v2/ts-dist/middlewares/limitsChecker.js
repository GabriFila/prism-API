"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function limitsChecker(req, res, next) {
    //check if there are errors in request
    if (req.method == "PUT") {
        let newValue = req.body.newValue;
        if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max))
            res.status(400).json({ error: `${newValue} is non valid for ${res.resource.name}` });
        //newValue is in limit
        else
            next();
    }
    else
        next();
}
exports.limitsChecker = limitsChecker;
//# sourceMappingURL=limitsChecker.js.map