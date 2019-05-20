import * as express from "express";
import * as observer from "node-observer";
import { Resource } from "../../model";

export const updates = express.Router();

updates.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  observer.subscribe(this, "API-updated", (who: any, resource: Resource) => {
    SSEwrite(resource);
  });

  observer.subscribe(this, "micro-updated", (who: any, resource: Resource) => {
    SSEwrite(resource);
  });

  function SSEwrite(resource: Resource) {
    res.write(`data: ${JSON.stringify({ resource })} \n`);
    res.write(`event: update\n`);
    res.write(`\n`);
  }
});
