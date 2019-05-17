import * as express from "express";

function bodyChecker(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.info("Checking body");

  //check if there is newValue field in request
  if ("newValue" in req.body) next();
  else res.errors = [`No newValue fieldin request`];
}

module.exports = bodyChecker;
