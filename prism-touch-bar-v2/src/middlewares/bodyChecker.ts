import * as express from "express";

//check if PUT request has newValue field
export function bodyChecker(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method == "PUT")
    if ("newValue" in req.body) next();
    else res.status(400).json({ error: `No newValue field in request body` });
  else next();
}
