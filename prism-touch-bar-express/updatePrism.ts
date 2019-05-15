import * as SerialPort from "serialport";
import { EventEmitter } from "events";
import { microState } from "./server";

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
export let updateEmitter = new EventEmitter();

updateEmitter.setMaxListeners(0);

const port = new SerialPort("COM4", {
  autoOpen: false
});

export function startSerial() {
  port.open(() => console.log(`Serial port ${port.path} open`));
  port.pipe(parser);
}

parser.on("data", data => {
  let objRx = JSON.parse(data);
  if (objRx != null) {
    console.log(objRx);
    updateStateFromPrism(objRx);
  } else console.log("Object received is null");
});

export function sendUpdateToPrism(event: string, data: any) { 

  port.write(serialize({ event, data }));
}

function serialize(obj: object): string {
  console.log(JSON.stringify(obj));
  
  return JSON.stringify(obj);
}

function updateStateFromPrism(objRx: any) {
  if ("event" in objRx) {
    switch (objRx["event"]) {
      case "micro-updated-offset-x":
        microState.scanParams.offset.x.current = objRx.newValue;
        updateEmitter.emit("micro-updated-offset-x");
        break;
      case "micro-updated-offset-y":
        microState.scanParams.offset.y.current = objRx.newValue;
        updateEmitter.emit("micro-updated-offset-y");
        break;
      case "micro-updated-offset-z":
        microState.scanParams.offset.z.current = objRx.newValue;
        updateEmitter.emit("micro-updated-offset-z");
        break;
      case "micro-updated-pixelNumber-x":
        microState.scanParams.pixelNumber.x.current = objRx.newValue;
        updateEmitter.emit("micro-updated-pixelNumber-x");
        break;
      case "micro-updated-pixelNumber-y":
        microState.scanParams.pixelNumber.y.current = objRx.newValue;
        updateEmitter.emit("micro-updated-pixelNumber-y");
        break;
      case "micro-updated-pixelNumber-z":
        microState.scanParams.pixelNumber.z.current = objRx.newValue;
        updateEmitter.emit("micro-updated-pixelNumber-z");
        break;
      case "micro-updated-range-x":
        microState.scanParams.range.x.current = objRx.newValue;
        updateEmitter.emit("micro-updated-range-x");
        break;
      case "micro-updated-range-y":
        microState.scanParams.range.y.current = objRx.newValue;
        updateEmitter.emit("micro-updated-range-y");
        break;
      case "micro-updated-range-z":
        microState.scanParams.range.z.current = objRx.newValue;
        updateEmitter.emit("micro-updated-range-z");
        break;
      case "micro-updated-lasers":
        microState.lasers = objRx.lasers;
        updateEmitter.emit("micro-updated-lasers");
        break;
      case "micro-updated-limits":
        updateEmitter.emit("micro-updated-limits");
        break;
      case "micro-updated-mode":
        microState.mode = objRx.newMode;
        updateEmitter.emit("micro-updated-mode");
        break;
      case "micro-updated-state":
        //microState = objRx.newState;
        updateEmitter.emit("micro-updated-state");
        break;
      default:
        break;
    }
  }
}
