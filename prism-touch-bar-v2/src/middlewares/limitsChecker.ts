import * as express from "express";

export function limitsChecker(req: express.Request, res: express.Response, next: express.NextFunction) {
  //check if there are errors in request
  if (req.method == "PUT") {
    let newValue = req.body.newValue;
    if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max))
      res.status(400).json({ error: `${newValue} is non valid for ${res.resource.id}` });
    //newValue is in limit
    else next();
  } else next();
}
