"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function limitsChecker(req, res, next) {
    if (req.method == "PUT") {
        let newValue = req.body.newValue;
        //check if newValue is in resource limit 
        if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max))
            res.status(400).json({ error: `${newValue} is non valid for ${res.resource.id}` });
        //newValue is in limit so procced to nex middleware
        else
            next();
    }
    else
        next();
}
exports.limitsChecker = limitsChecker;
//# sourceMappingURL=limitsChecker.js.map