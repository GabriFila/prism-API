import * as express from "express";

function checkLimits(req: express.Request, res: express.Response, next: express.NextFunction) {
  //check if there are errors in request
  if ("errors" in res) next();
  else {
    let newValue = req.body.newValue;
    if (("min" in res.resource && newValue >= res.resource.min) || ("max" in res.resource && newValue <= res.resource.max)) {
    } else res.errors.push(`${newValue} is non valid for ${res.resource.name}`);
  }
}
