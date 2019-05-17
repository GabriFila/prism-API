import * as observer from "node-observer";

class ResourceValue {
  resource: string;
  value: number | boolean;
}
export function start() {
  observer.subscribe(this, "update", (who: any, data: ResourceValue) => {
    console.log("event " + data.resource);
    console.log("value " + data.value);
  });
}
