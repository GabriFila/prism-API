import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
import { Motors } from "./api-resources";
import { startSerial, simulateStateFromMicroscope } from "./toFromPrism";

const server = express();


export const motorValues = new Motors();

//setInterval(getStateFromMicroscope,5000);
simulateStateFromMicroscope();

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


startSerial();

