const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM4", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "dataEnd" }));
// Read the port data
port.on("open", () => {
  console.log("serial port open");
});

port.write(
  JSON.stringify({
    led: true
  })
);

parser.on("data", data => {
  console.log(JSON.parse(data));
});