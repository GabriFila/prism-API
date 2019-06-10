import * as observer from "node-observer";
import { Resource, microState, XYZ, Laser } from "./model";
import * as SerialPort from "serialport";

//parse incoming serial data on every \n
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
let sp: SerialPort = undefined;

//try to connect to serial port
export function tryToConnectToMicro() {
  //simulate connection with microscope
  if (process.env.SERIAL_PORT == "") {
    observer.send(this, "micro-connected");
    //open available serial port
  } else if (process.env.SERIAL_PORT == "auto") {
    SerialPort.list().then(ports => {
      if (ports.length > 0) {
        let portName = ports[0].comName.toString();
        sp = new SerialPort(portName, {
          baudRate: 9600,
          autoOpen: false
        });

        observer.subscribe(this, "update-to-micro", (who: any, resource: Resource) => {
          sendUpdateToPrism(resource);
        });

        observer.send(this, "micro-connected");
        sp.open(() => console.log(`Serial port ${sp.path} open`));
        sp.pipe(parser);
      } else {
        observer.send(this, "micro-not-connected");
      }
    });
    //open specific serialport
  } else {
    sp = new SerialPort(process.env.SERIAL_PORT, {
      baudRate: 9600,
      autoOpen: false
    });

    observer.subscribe(this, "update-to-micro", (who: any, resource: Resource) => {
      sendUpdateToPrism(resource);
    });

    observer.send(this, "micro-connected");
    sp.open(() => console.log(`Serial port ${sp.path} open`));
    sp.pipe(parser);
  }
}

//get serial input and parse it
parser.on("data", data => {
  try {
    let objRx = JSON.parse(data);
    if (objRx != null) {
      updateMicroState(objRx);
    }
  } catch (s) {
    console.log("Error on parsing serial input");
  }
});

function updateMicroState(newData: SerialData) {
  //lasers changed event handler
  if (newData.id == "lasers-changed") {
    let nLasers = (newData.newValue as LaserChange[]).length;
    for (let i = 0; i < nLasers; i++) {
      let newLaser = (newData.newValue as LaserChange[])[i];
      let newWaveLength = newLaser.wL;
      microState.lasers[i].waveLength.id = `laser-${newWaveLength}-nm-waveLength`;
      microState.lasers[i].waveLength.value = newLaser.wL;
      microState.lasers[i].isOn.id = `laser-${newWaveLength}-nm-isOn`;
      microState.lasers[i].isOn.value = newLaser.isOn;
      microState.lasers[i].power.id = `laser-${newWaveLength}-nm-power`;
      microState.lasers[i].power.value = newLaser.pw;
      microState.lasers[i].isPresent.id = `laser-${newWaveLength}-nm-isPresent`;
      microState.lasers[i].isPresent.value = true;
    }
    for (let i = nLasers; i < 4; i++) {
      microState.lasers[i].waveLength.value = 0;
      microState.lasers[i].waveLength.id = `no-laser`;
      microState.lasers[i].isOn.id = `no-laser`;
      microState.lasers[i].power.id = `no-laser`;
      microState.lasers[i].isPresent.value = false;
    }
    observer.send(this, "lasers-changed");
  } else {
    // resource value updated
    let idEls = newData.id.split("-");
    switch (idEls[0]) {
      case "scanParams":
        if (idEls[1] == "dwellTime") microState.scanParams.dwellTime.value = newData.newValue as number;
        else (microState.scanParams[idEls[1]] as XYZ)[idEls[2]].value = newData.newValue as number;
        break;
      case "laser":
        (microState.lasers.find(laser => laser.waveLength.value == Number(idEls[1])) as any)[idEls[3]].value = newData.newValue;
        break;
      case "mode":
        microState.mode.value = newData.newValue as string;
        break;
      default:
        break;
    }
    observer.send(this, "update-to-UI", { id: newData.id, value: newData.newValue } as Resource);
  }
}

function sendUpdateToPrism(res: Resource) {
  let objTx: SerialData = {
    id: res.id,
    newValue: res.value
  };

  sp.write(serializeData(objTx));
  sp.write("\n");
}

function serializeData(obj: object): string {
  return JSON.stringify(obj);
}

//interface for incoming serial data
interface SerialData {
  id: string;
  newValue: number | string | boolean | LaserChange[];
}

//interface for laser change serial event
interface LaserChange {
  wL: number;
  isOn: boolean;
  pw: number;
}
