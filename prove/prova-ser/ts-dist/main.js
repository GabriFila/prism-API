"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
const port = new SerialPort("COM4", {
    autoOpen: false
});
port.open(() => console.log(`Serial port ${port.path} open`));
port.pipe(parser);
parser.on("data", data => {
    let objRx = JSON.parse(data);
    if (objRx != null)
        if (objRx.msg == "send") {
            console.log(`rx delay: ${objRx.delayRX}`);
            console.log("Mando");
            port.write(JSON.stringify({
                delay: 100,
                times: 10
            }));
        }
        else if (objRx == "stop") {
            console.log("Comunication stopped");
        }
        else
            console.log("objRx is null");
});
setTimeout(() => {
    console.log("Mando primo pacchetto");
    port.write(JSON.stringify({
        delay: 100,
        times: 10
    }));
}, 2000);
//# sourceMappingURL=main.js.map