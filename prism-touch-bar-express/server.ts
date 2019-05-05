import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import { State } from "./api-classes";
import { Motors } from "./api-classes";

const server = express();

export const state = new State();
export const motors = new Motors();

//setInterval(getStateFromMicroscope,5000);
getStateFromMicroscope();

//json parser middlware
server.use(bodyParser.json());

//static file to render UI on client
server.use("/views", express.static(path.join(__dirname + "/../views")));
server.use("/assets", express.static(path.join(__dirname + "/../assets")));
server.use("/codeBehind", express.static(path.join(__dirname + "/../codeBehind")));

//routes
server.use("/prism-state", require("./routes/prism-state"));
server.use("/prism-motors", require("./routes/prism-motors"));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/mainUI.html"));
});

//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));

function getStateFromMicroscope() {
  state.scanParams.offset.x.current = 100;
  state.scanParams.offset.y.current = 100;
  state.scanParams.offset.x.max = 200;

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
