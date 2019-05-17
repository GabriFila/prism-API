import * as observer from "node-observer";
import { start } from "./updater";

start();
observer.send(this, "update", {resource:"offset-x", value:true});
observer.send(this, "spento", 24);
