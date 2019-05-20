import * as observer from "node-observer";
import { Resource, microState, XYZ } from "./model";
import * as SerialPort from "serialport";

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });

export function setUpMicroCom() {
  observer.subscribe(this, "update-to-micro", (who: any, resource: Resource) => {
    sendUpdateToPrism(resource);
  });

  SerialPort.list(function(err, ports) {
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
      } else console.log("no microscope attached");
    });
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
  let idEls = res.id.split("-");
  switch (idEls[0]) {
    case "scanParams":
      if (idEls[1] == "dwellTime") microState.scanParams.dwellTime.value = res.newValue;
      else (microState.scanParams[idEls[1]] as XYZ)[idEls[2]].value = res.newValue;
      break;
    case "laser":
      (microState.lasers.find(laser => laser.waveLength.value == Number(idEls[1])) as any)[idEls[3]].value = res.newValue;
      break;
    case "mode":
      microState.mode.value = res.newValue;
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
  newValue: number | string | boolean;
}
