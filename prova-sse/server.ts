import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import { EventEmitter } from "events";
import { ServerResponse } from "http";

const server = express();

//setInterval(getStateFromMicroscope,5000);

//json parser middlware
server.use(bodyParser.json());

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});

//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));

server.get("/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  let obj = {
    Nome: "Gabriele",
    Cognome: "Filaferro"
  };

  sender.on("laser-update", () => {
    //res.write(SSEdata(obj, "info"));
    SSEwrite(obj, "info");
  });

  function SSEwrite(input: object, event: string) {
    res.write(`data: ${JSON.stringify(input)} \n`);
    res.write(`event: ${event}\n`);
    res.write(`\n`);
  }
});

let sender = new EventEmitter();

setInterval(() => sender.emit("laser-update"), 1000);
