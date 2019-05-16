import * as SerialPort from "serialport";
import { EventEmitter } from "events";
import { State } from "./api-resources";

let portName: string;
let port: SerialPort;

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });

export let updateEmitter = new EventEmitter();
export let microState = new State();

updateEmitter.setMaxListeners(0);

/*
const port = new SerialPort("COM4", {
  autoOpen: false
});


*/

export function startSerial() {
  SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
      
      if (port.vendorId == "2341") {
        console.log("Found It");
        portName = port.comName.toString();
        console.log(portName);
      }
    });

    port = new SerialPort(portName, {
      baudRate: 9600,
      autoOpen: false
    });
    port.open(() => console.log(`Serial port ${port.path} open`));
    port.pipe(parser);
  });
}

parser.on("data", data => {
  try {
    let objRx = JSON.parse(data);
    if (objRx != null) {
      console.log(objRx);
      updateStateFromPrism(objRx);
    } else console.log("Object received is null");
  } catch (s) {
    console.log("ERRORE:  !!!!!!!!!!!!!!!!");

    //console.log(s);
  }
});

export function sendUpdateToPrism(event: string, data: any) {
  port.write(serialize({ event, data }));
}

function serialize(obj: object): string {
  //console.log(JSON.stringify(obj));
  console.log("sent");

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
        microState = objRx.newState;
        updateEmitter.emit("micro-updated-state");
        break;
      default:
        break;
    }
  }
}

/*sender for updates event */
export function simulateStateFromMicroscope() {
  microState.scanParams.dwellTime = 50;

  microState.scanParams.offset.x.current = 0;
  microState.scanParams.offset.x.max = 1000;
  microState.scanParams.offset.x.min = 0;

  microState.scanParams.offset.y.current = 0;
  microState.scanParams.offset.y.max = 1000;
  microState.scanParams.offset.y.min = 0;

  microState.scanParams.offset.z.current = 0;
  microState.scanParams.offset.z.max = 1000;
  microState.scanParams.offset.z.min = 0;

  microState.scanParams.pixelNumber.x.current = 500;
  microState.scanParams.pixelNumber.x.max = 1000;
  microState.scanParams.pixelNumber.x.min = 0;

  microState.scanParams.pixelNumber.y.current = 500;
  microState.scanParams.pixelNumber.y.max = 1000;
  microState.scanParams.pixelNumber.y.min = 0;

  microState.scanParams.pixelNumber.z.current = 500;
  microState.scanParams.pixelNumber.z.max = 1000;
  microState.scanParams.pixelNumber.z.min = 0;

  microState.scanParams.range.x.current = 500;
  microState.scanParams.range.x.max = 1000;
  microState.scanParams.range.x.min = 0;

  microState.scanParams.range.y.current = 500;
  microState.scanParams.range.y.max = 1000;
  microState.scanParams.range.y.min = 0;

  microState.scanParams.range.z.current = 500;
  microState.scanParams.range.z.max = 1000;
  microState.scanParams.range.z.min = 0;

  microState.lasers[0].waveLength = 300;
  microState.lasers[0].isOn = true;
  microState.lasers[0].power = 0;

  microState.lasers[1].waveLength = 400;
  microState.lasers[1].isOn = true;
  microState.lasers[1].power = 10;

  microState.lasers[2].waveLength = 500;
  microState.lasers[2].isOn = true;
  microState.lasers[2].power = 20;

  microState.lasers[3].waveLength = 600;
  microState.lasers[3].isOn = true;
  microState.lasers[3].power = 30;
}
