import * as express from "express";

function responseSender(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.info("Sending response");

  //check if there are errors in request
  if ("errors" in res) res.status(400).json(res.errors);
  else
    res.status(200).json({
      event: `${res.resource.name} updated to ${res.resource.value} ${"unit" in res.resource ? res.resource.unit : ""}`,
      newValue: res.resource.value
    });
}

module.exports = responseSender;
