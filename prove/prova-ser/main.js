const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("COM4", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));
// Read the port data
port.on("open", () => {
  console.log("serial port open");
});

parser.on("data", data => {
  let objRx = JSON.parse(data);
  if (objRx != null)
    if (objRx.msg == "send") {
      console.log(`rx delay: ${objRx.delayRX}`);
      console.log("Mando");
      port.write(
        JSON.stringify({
          delay: 300,
          times: 10
        })
      );
    } else if (objRx == "stop") {
      console.log("Comunication stopped");
    } else console.log("objRx is null");
});

setTimeout(() => {
  console.log("Mando primo pacchetto");
  port.write(
    JSON.stringify({
      delay: 300,
      times: 10
    })
  );
}, 2000);

/*
setTimeout(() => {
  console.log("Inizio a mandare dati");
  setInterval(() => {
    console.log("Mando");
    port.write(
      JSON.stringify({
        delay: 1000,
        times: 10
      })
    );
  }, 1000);
}, 1000);
*/
