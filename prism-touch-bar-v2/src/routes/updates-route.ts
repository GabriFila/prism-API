import * as express from "express";
import * as observer from "node-observer";
import { Resource } from "../model";

export const updates = express.Router();

export function setUpObserver() {
  console.log(`setting up observer`);

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
    SSEwrite(resource.value, `updated-${resource.name}`);
    console.log("Sent SSE");
  });

  function SSEwrite(newValue: number | boolean, event: string) {
    res.write(`data: ${JSON.stringify({ newValue })} \n`);
    res.write(`event: ${event}\n`);
    res.write(`\n`);
  }
});