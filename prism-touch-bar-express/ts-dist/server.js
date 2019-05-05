"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api_classes_1 = require("./api-classes");
const api_classes_2 = require("./api-classes");
const server = express();
exports.state = new api_classes_1.State();
exports.motors = new api_classes_2.Motors();
//setInterval(getStateFromMicroscope,5000);
getStateFromMicroscope();
//json parser middlware
server.use(bodyParser.json());
//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));
//routes
server.use("/prism-state", require("./routes/prism-state"));
server.use("/prism-motors", require("./routes/prism-motors"));
//send web app UI
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});
//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));
function getStateFromMicroscope() {
    exports.state.scanParams.offset.x.current = 100;
    exports.state.scanParams.offset.y.current = 100;
    exports.state.scanParams.offset.x.max = 200;
    exports.state.lasers[0].waveLength = 300;
    exports.state.lasers[0].isOn = true;
    exports.state.lasers[0].power = 0;
    exports.state.lasers[1].waveLength = 400;
    exports.state.lasers[1].isOn = true;
    exports.state.lasers[1].power = 10;
    exports.state.lasers[2].waveLength = 500;
    exports.state.lasers[2].isOn = true;
    exports.state.lasers[2].power = 20;
    exports.state.lasers[3].waveLength = 600;
    exports.state.lasers[3].isOn = true;
    exports.state.lasers[3].power = 30;
}
function sendStateToPrism() { }
//# sourceMappingURL=server.js.map