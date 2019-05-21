import * as observer from "node-observer";
import { Resource, microState, XYZ } from "./model";
import * as SerialPort from "serialport";

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });

export function connectToMicro() {
  let microConnected;
  SerialPort.list(function(err, ports) {
    if (ports.length == 0) microConnected = false;
    else {
      ports.forEach(function(port) {
        if (port.vendorId == "2341") {
          console.log("Found It");
          let portName = port.comName.toString();
          console.log(portName);
          port = new SerialPort(portName, {
            baudRate: 9600,
            autoOpen: false
          });
          port.open(() => console.log(`Serial port ${port.path} open`));
          port.pipe(parser);
          microConnected = true;
        } else microConnected = false;
      });
    }
  });

  if (!microConnected) throw new Error("no micro attached");
  else
    observer.subscribe(this, "update-to-micro", (who: any, resource: Resource) => {
      sendUpdateToPrism(resource);
    });
}

//gets serial input and parses it
parser.on("data", data => {
  try {
    let objRx = JSON.parse(data);
    if (objRx != null) {
      updateMicroState(objRx);
      observer.send(this, "update-to-UI");
    }
  } catch (s) {
    console.log("Error on parsing serial input");
  }
});

function updateMicroState(res: SerialData) {
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
  let objTx = {
    id: res.id,
    newValue: res.value
  };

  parser.write(serializeData(objTx));
}

function serializeData(obj: object): string {
  return JSON.stringify(obj);
}

interface SerialData {
  id: string;
  newValue: number | string | boolean | number[];
}
