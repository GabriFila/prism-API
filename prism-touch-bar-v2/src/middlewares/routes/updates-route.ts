import * as express from "express";
import * as observer from "node-observer";
import { Resource } from "../../model";

export const updates = express.Router();

export function setUpObserver() {
  observer.subscribe(this, "API-updated", (who: any, resource: Resource) => {
    //function sendUpdateToPrism(`updated-${resource.name}`, resource.value)
    //SSEwrite(resource.value, `updated-${resource.name}`);
    console.info(`Sent update with ${resource.value}`);
  });
}

updates.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  observer.subscribe(this, "API-update", (who: any, resource: Resource) => {
    //function sendUpdateToPrism(`updated-${resource.name}`, resource.value)
    SSEwrite(resource);
    console.log("Sent SSE");
  });

  function SSEwrite(resource: Resource) {
    res.write(`data: ${JSON.stringify({ resource })} \n`);
    res.write(`event: update\n`);
    res.write(`\n`);
  }
});
