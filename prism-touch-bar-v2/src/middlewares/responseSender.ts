import * as express from "express";
import * as observer from "node-observer";

export function responseSender(req: express.Request, res: express.Response, next: express.NextFunction) {

  //check if there are errors in request
  if (req.method == "PUT") {
    res.resource.value = req.body.newValue;
    observer.send(this, "API-updated", res.resource);
    res.status(200).json({ newValue: res.resource.value });
  } else next();
}
