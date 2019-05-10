import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import { State } from "./api-resources";
import { Motors } from "./api-resources";
import { EventEmitter } from "events";

const server = express();

export const microState = new State();
export const motorValues = new Motors();

//setInterval(getStateFromMicroscope,5000);
getStateFromMicroscope();

//json parser middlware
server.use(bodyParser.json());

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));

//routes
server.use("/prismState", require("./routes/prismState-route"));
server.use("/prismMotors", require("./routes/prismMotors-route"));
server.use("/updates", require("./routes/updates-route"));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});
//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));

function getStateFromMicroscope() {
  microState.scanParams.dwellTime = 50;

  microState.scanParams.offset.x.current = 0;
  microState.scanParams.offset.x.max = 1000;
  microState.scanParams.offset.x.min = 0;

  microState.scanParams.offset.y.current = 0;
  microState.scanParams.offset.y.max = 1000;
  microState.scanParams.offset.y.min = 0;

  microState.scanParams.offset.z.current = 0;
  microState.scanParams.offset.z.max = 1000;
  microState.scanParams.offset.z.min = 0;

  microState.scanParams.pixelNumber.x.current = 500;
  microState.scanParams.pixelNumber.x.max = 1000;
  microState.scanParams.pixelNumber.x.min = 0;

  microState.scanParams.pixelNumber.y.current = 500;
  microState.scanParams.pixelNumber.y.max = 1000;
  microState.scanParams.pixelNumber.y.min = 0;

  microState.scanParams.pixelNumber.z.current = 500;
  microState.scanParams.pixelNumber.z.max = 1000;
  microState.scanParams.pixelNumber.z.min = 0;

  microState.scanParams.range.x.current = 500;
  microState.scanParams.range.x.max = 1000;
  microState.scanParams.range.x.min = 0;

  microState.scanParams.range.y.current = 500;
  microState.scanParams.range.y.max = 1000;
  microState.scanParams.range.y.min = 0;

  microState.scanParams.range.z.current = 500;
  microState.scanParams.range.z.max = 1000;
  microState.scanParams.range.z.min = 0;

  microState.lasers[0].waveLength = 300;
  microState.lasers[0].isOn = true;
  microState.lasers[0].power = 0;

  microState.lasers[1].waveLength = 400;
  microState.lasers[1].isOn = true;
  microState.lasers[1].power = 10;

  microState.lasers[2].waveLength = 500;
  microState.lasers[2].isOn = true;
  microState.lasers[2].power = 20;

  microState.lasers[3].waveLength = 600;
  microState.lasers[3].isOn = true;
  microState.lasers[3].power = 30;
}

function sendStateToPrism() {}

export let updateEmitter = new EventEmitter();
