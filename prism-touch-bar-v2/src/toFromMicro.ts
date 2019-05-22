import * as observer from "node-observer";
import { Resource, microState, XYZ, Laser } from "./model";
import * as SerialPort from "serialport";

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
let sp: SerialPort = undefined;

export function tryToConnectToMicro() {
  SerialPort.list().then(ports => {
    if (ports.some(port => port.vendorId == "2341")) {
    let portName = ports.find(port => port.vendorId == "2341").comName.toString();
      console.log(portName);
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
}

//gets serial input and parses it
parser.on("data", data => {
  console.log("data arrived");

  try {
    let objRx = JSON.parse(data);
    if (objRx != null) {
      //console.log(objRx);

      updateMicroState(objRx);
    }
  } catch (s) {
    console.log("Error on parsing serial input");
  }
});

function updateMicroState(newData: SerialData) {
  if (newData.id == "lasers-changed") {
    console.log("arrived laser changed");

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

interface SerialData {
  id: string;
  newValue: number | string | boolean | LaserChange[];
}

interface LaserChange {
  wL: number;
  isOn: boolean;
  pw: number;
}
