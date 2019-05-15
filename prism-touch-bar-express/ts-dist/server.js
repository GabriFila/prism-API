"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api_resources_1 = require("./api-resources");
const api_resources_2 = require("./api-resources");
const updatePrism_1 = require("./updatePrism");
const server = express();
exports.microState = new api_resources_1.State();
exports.motorValues = new api_resources_2.Motors();
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
/*simulate state*/
function getStateFromMicroscope() {
    exports.microState.scanParams.dwellTime = 50;
    exports.microState.scanParams.offset.x.current = 0;
    exports.microState.scanParams.offset.x.max = 1000;
    exports.microState.scanParams.offset.x.min = 0;
    exports.microState.scanParams.offset.y.current = 0;
    exports.microState.scanParams.offset.y.max = 1000;
    exports.microState.scanParams.offset.y.min = 0;
    exports.microState.scanParams.offset.z.current = 0;
    exports.microState.scanParams.offset.z.max = 1000;
    exports.microState.scanParams.offset.z.min = 0;
    exports.microState.scanParams.pixelNumber.x.current = 500;
    exports.microState.scanParams.pixelNumber.x.max = 1000;
    exports.microState.scanParams.pixelNumber.x.min = 0;
    exports.microState.scanParams.pixelNumber.y.current = 500;
    exports.microState.scanParams.pixelNumber.y.max = 1000;
    exports.microState.scanParams.pixelNumber.y.min = 0;
    exports.microState.scanParams.pixelNumber.z.current = 500;
    exports.microState.scanParams.pixelNumber.z.max = 1000;
    exports.microState.scanParams.pixelNumber.z.min = 0;
    exports.microState.scanParams.range.x.current = 500;
    exports.microState.scanParams.range.x.max = 1000;
    exports.microState.scanParams.range.x.min = 0;
    exports.microState.scanParams.range.y.current = 500;
    exports.microState.scanParams.range.y.max = 1000;
    exports.microState.scanParams.range.y.min = 0;
    exports.microState.scanParams.range.z.current = 500;
    exports.microState.scanParams.range.z.max = 1000;
    exports.microState.scanParams.range.z.min = 0;
    exports.microState.lasers[0].waveLength = 300;
    exports.microState.lasers[0].isOn = true;
    exports.microState.lasers[0].power = 0;
    exports.microState.lasers[1].waveLength = 400;
    exports.microState.lasers[1].isOn = true;
    exports.microState.lasers[1].power = 10;
    exports.microState.lasers[2].waveLength = 500;
    exports.microState.lasers[2].isOn = true;
    exports.microState.lasers[2].power = 20;
    exports.microState.lasers[3].waveLength = 600;
    exports.microState.lasers[3].isOn = true;
    exports.microState.lasers[3].power = 30;
}
updatePrism_1.startSerial();
/*sender for updates event */
//# sourceMappingURL=server.js.map