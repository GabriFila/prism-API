import * as express from "express";
import * as observer from "node-observer";
import { Resource, microState } from "../../model";
import { stringify } from "querystring";

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

  observer.subscribe(this, "lasers-changed", () => {
    console.log("sent-laser changed");
    
    res.write(`data: ${JSON.stringify({lasers: microState.lasers})}\n`);
    res.write(`event: lasers-changed\n`);
    res.write(`\n`);
  });

  function SSEwriteResource(resource: Resource) {
    console.log(resource);
    
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
