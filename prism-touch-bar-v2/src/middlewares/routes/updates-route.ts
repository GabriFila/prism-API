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

  observer.subscribe(this, "update-to-UI", (who: any, resource: Resource) => {
    SSEwriteResource(resource);
  });

  observer.subscribe(this, "micro-connected", () => SSEwriteEvent("micro-connected"));

  function SSEwriteResource(resource: Resource) {
    res.write(`data: ${JSON.stringify({ resource })} \n`);
    res.write(`event: update\n`);
    res.write(`\n`);
  }
  function SSEwriteEvent(event: string) {
    res.write(`data: \n`);
    res.write(`event: ${event}\n`);
    res.write(`\n`);
  }
});
