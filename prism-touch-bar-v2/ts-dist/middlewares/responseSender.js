"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
function responseSender(req, res, next) {
    //check if there are errors in request
    if (req.method == "PUT") {
        res.resource.value = req.body.newValue;
        observer.send(this, "update-to-UI", res.resource);
        observer.send(this, "update-to-micro", res.resource);
        res.status(200).json({ newValue: res.resource.value });
    }
    else
        next();
}
exports.responseSender = responseSender;
//# sourceMappingURL=responseSender.js.map