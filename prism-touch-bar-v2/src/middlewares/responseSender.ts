import * as express from "express";
import * as observer from "node-observer";

export function responseSender(req: express.Request, res: express.Response, next: express.NextFunction) {
  //check if there are errors in request
  if (req.method == "PUT") {
    res.resource.value = req.body.newValue;
    observer.send(this, "update-to-UI", res.resource);
    console.log(res.resource.value);
    
    observer.send(this, "update-to-micro", res.resource);
    res.status(200).json({ newValue: res.resource.value });
  } else next();
}
