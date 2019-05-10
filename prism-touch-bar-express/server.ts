import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import { State } from "./api-resources";
import { Motors } from "./api-resources";
import { EventEmitter } from "events";

const server = express();

export const microState = new State();
export const motors = new Motors();

//setInterval(getStateFromMicroscope,5000);
getStateFromMicroscope();

//json parser middlware
server.use(bodyParser.json());

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));

//routes
server.use("/prismState", require("./routes/prismState-route"));
server.use("/prismMotors", require("./routes/prismMotors-route"));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});

server.get("/updates", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  updateEmitter.on("temp2", () => console.log("temp 2 emitted"));

  updateEmitter.on("offset-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.x.current }, "offset-x-updated");
  });

  updateEmitter.on("offset-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.y.current }, "offset-y-updated");
  });
  updateEmitter.on("offset-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.z.current }, "offset-z-updated");
  });

  updateEmitter.on("pixelNumber-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.x.current }, "pixelNumber-x-updated");
  });
  updateEmitter.on("pixelNumber-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.y.current }, "pixelNumber-y-updated");
  });
  updateEmitter.on("pixelNumber-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.z.current }, "pixelNumber-z-updated");
  });

  updateEmitter.on("range-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.x.current }, "range-x-updated");
  });
  updateEmitter.on("range-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.y.current }, "range-y-updated");
  });
  updateEmitter.on("range-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.z.current }, "range-z-updated");
  });

  updateEmitter.on("dwellTime-updated", () => {
    SSEwrite({ newValue: microState.scanParams.dwellTime }, "dwellTime-updated");
  });

  updateEmitter.on("lasers-updated", () => {
    SSEwrite(microState.lasers, "lasers-updated");
  });

  updateEmitter.on("mode-updated", () => {
    SSEwrite({ mode: microState.mode }, "mode-updated");
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
