"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//check if PUT request has newValue field
function bodyChecker(req, res, next) {
    if (req.method == "PUT")
        if ("newValue" in req.body)
            next();
        else
            res.status(400).json({ error: `No newValue field in request body` });
    else
        next();
}
exports.bodyChecker = bodyChecker;
//# sourceMappingURL=bodyChecker.js.map