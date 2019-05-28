import * as express from "express";
import * as observer from "node-observer";

  //last middleware in path so update model, microstate and 
export function responseSender(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method == "PUT") {
    res.resource.value = req.body.newValue;
    observer.send(this, "update-to-UI", res.resource);
    
    observer.send(this, "update-to-micro", res.resource);
    res.status(200).json({ newValue: res.resource.value });
  } else next();
}
