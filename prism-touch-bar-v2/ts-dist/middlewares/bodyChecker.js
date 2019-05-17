"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bodyChecker(req, res, next) {
    console.info("Checking body");
    //check if there is newValue field in request
    if ("newValue" in req.body)
        next();
    else
        res.errors = [`No newValue fieldin request`];
}
module.exports = bodyChecker;
//# sourceMappingURL=bodyChecker.js.map