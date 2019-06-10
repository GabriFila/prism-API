"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//check if PUT request newValue is in correct limit
function limitsChecker(req, res, next) {
    if (req.method == "PUT") {
        let newValue = req.body.newValue;
        if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max))
            res.status(400).json({ error: `${newValue} is non valid for ${res.resource.id}` });
        //newValue is in limit so procced to next middleware
        else
            next();
    }
    else
        next();
}
exports.limitsChecker = limitsChecker;
//# sourceMappingURL=limitsChecker.js.map