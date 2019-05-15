"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort = require("serialport");
const events_1 = require("events");
const server_1 = require("./server");
const parser = new SerialPort.parsers.Readline({ delimiter: "\n", includeDelimiter: false });
exports.updateEmitter = new events_1.EventEmitter();
const port = new SerialPort("COM4", {
    autoOpen: false
});
function startSerial() {
    port.open(() => console.log(`Serial port ${port.path} open`));
    port.pipe(parser);
}
exports.startSerial = startSerial;
parser.on("data", data => {
    let objRx = JSON.parse(data);
    if (objRx != null)
        console.log(objRx);
    else
        console.log("Object received is null");
});
exports.updateEmitter.on("lasers-updated", () => {
    console.log("Mando pacchetto laser");
    port.write(JSON.stringify({ lasers: server_1.microState.lasers }));
});
//# sourceMappingURL=updatePrism.js.map