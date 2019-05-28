import * as express from "express";

export function limitsChecker(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method == "PUT") {
    let newValue = req.body.newValue;
    //check if newValue is in resource limit 
    if (("min" in res.resource && newValue < res.resource.min) || ("max" in res.resource && newValue > res.resource.max))
      res.status(400).json({ error: `${newValue} is non valid for ${res.resource.id}` });
    //newValue is in limit so procced to nex middleware
    else next();
  } else next();
}
