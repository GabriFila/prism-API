import * as SerialPort from "serialport";
import { EventEmitter } from "events";
import { microState } from "./server";

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
export let updateEmitter = new EventEmitter();

const port = new SerialPort("COM4", {
  autoOpen: false
});

export function startSerial() {
  port.open(() => console.log(`Serial port ${port.path} open`));
  port.pipe(parser);
}

parser.on("data", data => {
  let objRx = JSON.parse(data);
  if (objRx != null) console.log(objRx);
  else console.log("Object received is null");
});

updateEmitter.on("lasers-updated", () => {
  console.log("Mando pacchetto laser");
  
  port.write(JSON.stringify({lasers: microState.lasers}));
});
