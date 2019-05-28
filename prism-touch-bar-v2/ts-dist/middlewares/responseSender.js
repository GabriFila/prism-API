"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer = require("node-observer");
//last middleware in path so update model, microstate and 
function responseSender(req, res, next) {
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