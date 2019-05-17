"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseSender(req, res, next) {
    console.info("Sending response");
    //check if there are errors in request
    if ("errors" in res)
        res.status(400).json(res.errors);
    else
        res.status(200).json({
            event: `${res.resource.name} updated to ${res.resource.value} ${"unit" in res.resource ? res.resource.unit : ""}`,
            newValue: res.resource.value
        });
}
module.exports = responseSender;
//# sourceMappingURL=responseSender.js.map