import * as observer from "node-observer";
import { Resource } from "./model";
import * as SerialPort from "serialport";

observer.subscribe(this, "API-updated", (who: any, resource: Resource) => {
  sendUpdateToPrism(resource.name, resource.value);
});

function sendUpdateToPrism(resId: string, resValue: number | boolean) {}

export function setUpMicroCom() {}

let portName: string;

const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });

export function startSerial() {
  SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
      if (port.vendorId == "2341") {
        console.log("Found It");
        portName = port.comName.toString();
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

parser.on("data", data => {
  try {
    let objRx = JSON.parse(data);
    if (objRx != null) {
      observer.send(this, "API-updated");
    }
  } catch (s) {
    console.log("ERRORE:  !!!!!!!!!!!!!!!!");
  }
});

function updateMicroState(res: Resource) {
  let idEls = res.name.split("-");
  switch (idEls[0]) {
    case "scanParams":
      break;
  }
}
