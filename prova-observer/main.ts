import * as observer from "node-observer";
import { gabri, isa } from "./resource";
import { start } from "./updater";

start();
observer.send(this, "update", {resource:"offset-x", value:true});
observer.send(this, "spento", 24);
