import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import { State } from "./api-classes";
import { Motors } from "./api-classes";
import { EventEmitter } from "events";

const server = express();

export const state = new State();
export const motors = new Motors();

//setInterval(getStateFromMicroscope,5000);
getStateFromMicroscope();

//json parser middlware
server.use(bodyParser.json());

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));
export const sender = new EventEmitter();

//routes
server.use("/prismState", require("./routes/prismState-route"));
server.use("/prismMotors", require("./routes/prismMotors-route"));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});

server.get("/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  sender.on("state-updated", () => {
    //res.write(SSEdata(obj, "info"));

    SSEwrite(state, "state-updated");
  });

  function SSEwrite(input: object, event: string) {
    res.write(`data: ${JSON.stringify(input)} \n`);
    res.write(`event: ${event}\n`);
    res.write(`\n`);
  }
});

//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));

function getStateFromMicroscope() {
  state.scanParams.dwellTime = 50;

  state.scanParams.offset.x.current = 200;
  state.scanParams.offset.x.max = 1000;
  state.scanParams.offset.x.min = 0;

  state.scanParams.offset.y.current = 500;
  state.scanParams.offset.y.max = 1000;
  state.scanParams.offset.y.min = 0;

  state.scanParams.offset.z.current = 500;
  state.scanParams.offset.z.max = 1000;
  state.scanParams.offset.z.min = 0;

  state.scanParams.pixelNumber.x.current = 500;
  state.scanParams.pixelNumber.x.max = 1000;
  state.scanParams.pixelNumber.x.min = 0;

  state.scanParams.pixelNumber.y.current = 500;
  state.scanParams.pixelNumber.y.max = 1000;
  state.scanParams.pixelNumber.y.min = 0;

  state.scanParams.pixelNumber.z.current = 500;
  state.scanParams.pixelNumber.z.max = 1000;
  state.scanParams.pixelNumber.z.min = 0;

  state.scanParams.range.x.current = 500;
  state.scanParams.range.x.max = 1000;
  state.scanParams.range.x.min = 0;

  state.scanParams.range.y.current = 500;
  state.scanParams.range.y.max = 1000;
  state.scanParams.range.y.min = 0;

  state.scanParams.range.z.current = 500;
  state.scanParams.range.z.max = 1000;
  state.scanParams.range.z.min = 0;

  state.lasers[0].waveLength = 300;
  state.lasers[0].isOn = true;
  state.lasers[0].power = 0;

  state.lasers[1].waveLength = 400;
  state.lasers[1].isOn = true;
  state.lasers[1].power = 10;

  state.lasers[2].waveLength = 500;
  state.lasers[2].isOn = true;
  state.lasers[2].power = 20;

  state.lasers[3].waveLength = 600;
  state.lasers[3].isOn = true;
  state.lasers[3].power = 30;
}

function sendStateToPrism() {}
