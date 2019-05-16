import * as observer from "node-observer";
import { gabri, isa } from "./resource";
/*
export function start() {
  observe(gabri);
  observe(isa);
}

export function observe(what: any) {
  observer.subscribe(this, what.name, (who: any, data: any) => {
    console.log("who: " + who);
    console.log("data: " + data);
    console.log("what surname: " + what.surname);
  });
}
*/
class ResourceValue {
  resource: string;
  value: number | boolean;
}
export function start() {
  observer.subscribe(this, "update", (who: any, data: ResourceValue) => {
    console.log("event " + data.resource);
    console.log("value " + data.value);
  });
  observer.subscribe(this, "spento", (who: any, data: any) => {
    console.log("spento");
  });
}
