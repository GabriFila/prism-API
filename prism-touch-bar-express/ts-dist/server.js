"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api_classes_1 = require("./api-classes");
const api_classes_2 = require("./api-classes");
const events_1 = require("events");
const server = express();
exports.state = new api_classes_1.State();
exports.motors = new api_classes_2.Motors();
//setInterval(getStateFromMicroscope,5000);
getStateFromMicroscope();
//json parser middlware
server.use(bodyParser.json());
//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));
exports.sender = new events_1.EventEmitter();
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
    exports.sender.on("state-updated", () => {
        //res.write(SSEdata(obj, "info"));
        SSEwrite(exports.state, "state-updated");
    });
    function SSEwrite(input, event) {
        res.write(`data: ${JSON.stringify(input)} \n`);
        res.write(`event: ${event}\n`);
        res.write(`\n`);
    }
});
//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));
function getStateFromMicroscope() {
    exports.state.scanParams.dwellTime = 50;
    exports.state.scanParams.offset.x.current = 200;
    exports.state.scanParams.offset.x.max = 1000;
    exports.state.scanParams.offset.x.min = 0;
    exports.state.scanParams.offset.y.current = 500;
    exports.state.scanParams.offset.y.max = 1000;
    exports.state.scanParams.offset.y.min = 0;
    exports.state.scanParams.offset.z.current = 500;
    exports.state.scanParams.offset.z.max = 1000;
    exports.state.scanParams.offset.z.min = 0;
    exports.state.scanParams.pixelNumber.x.current = 500;
    exports.state.scanParams.pixelNumber.x.max = 1000;
    exports.state.scanParams.pixelNumber.x.min = 0;
    exports.state.scanParams.pixelNumber.y.current = 500;
    exports.state.scanParams.pixelNumber.y.max = 1000;
    exports.state.scanParams.pixelNumber.y.min = 0;
    exports.state.scanParams.pixelNumber.z.current = 500;
    exports.state.scanParams.pixelNumber.z.max = 1000;
    exports.state.scanParams.pixelNumber.z.min = 0;
    exports.state.scanParams.range.x.current = 500;
    exports.state.scanParams.range.x.max = 1000;
    exports.state.scanParams.range.x.min = 0;
    exports.state.scanParams.range.y.current = 500;
    exports.state.scanParams.range.y.max = 1000;
    exports.state.scanParams.range.y.min = 0;
    exports.state.scanParams.range.z.current = 500;
    exports.state.scanParams.range.z.max = 1000;
    exports.state.scanParams.range.z.min = 0;
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