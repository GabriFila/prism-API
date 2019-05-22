import * as observer from "node-observer";
import { Resource, microState, XYZ } from "./model";
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
      console.log(objRx);

      updateMicroState(objRx);
      observer.send(this, "update-to-UI");
    }
  } catch (s) {
    console.log("Error on parsing serial input");
  }
});

function updateMicroState(res: SerialData) {
  console.log("updateing microsstate");
  
  if (res.id == "lasers-change") {
    let nLasers = (res.newValue as number[]).length;
    for (let i = 0; i < nLasers; i++) {
      let newWaveLength;
      microState.lasers[i].waveLength.value = (res.newValue as number[])[i];
      microState.lasers[i].waveLength.id = `laser-${newWaveLength}-nm-waveLength`;
      microState.lasers[i].isOn.id = `laser-${newWaveLength}-nm-isOn`;
      microState.lasers[i].power.id = `laser-${newWaveLength}-nm-power`;
      microState.lasers[i].isPresent.id = `laser-${newWaveLength}-nm-isPresent`;
    }
  }
  let idEls = res.id.split("-");
  switch (idEls[0]) {
    case "scanParams":
      if (idEls[1] == "dwellTime") microState.scanParams.dwellTime.value = res.newValue as number;
      else (microState.scanParams[idEls[1]] as XYZ)[idEls[2]].value = res.newValue as number;
      break;
    case "laser":
      (microState.lasers.find(laser => laser.waveLength.value == Number(idEls[1])) as any)[idEls[3]].value = res.newValue;
      break;
    case "mode":
      microState.mode.value = res.newValue as string;
      break;
    default:
      break;
  }
}

function sendUpdateToPrism(res: Resource) {
  let objTx : SerialData= {
    id: res.id,
    newValue: res.value
  };
  
  sp.write(serializeData(objTx));
  console.log("data sent");
  
}

function serializeData(obj: object): string {
  return JSON.stringify(obj);
}

interface SerialData {
  id: string;
  newValue: number | string | boolean | number[];
}
