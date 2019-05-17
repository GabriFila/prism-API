import * as express from "express";
import * as observer from "node-observer";

function limitsChecker(req: express.Request, res: express.Response, next: express.NextFunction) {
  //check if there are errors in request
  if ("errors" in res) next();
  else {
    console.info("Checking newValue limits");
    let newValue = req.body.newValue;
    if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max)) {
      res.errors.push(`${newValue} is non valid for ${res.resource.name}`);
    }
    //newValue is in limit
    else {
      console.info("newValue is in limits");
      res.resource.value = req.body.newValue;
      
      observer.send(this, "API-updated", res.resource);
    }
  }
}

module.exports = limitsChecker;
