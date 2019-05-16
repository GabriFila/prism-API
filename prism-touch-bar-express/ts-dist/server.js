"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api_resources_1 = require("./api-resources");
const toFromPrism_1 = require("./toFromPrism");
const server = express();
exports.motorValues = new api_resources_1.Motors();
//setInterval(getStateFromMicroscope,5000);
toFromPrism_1.simulateStateFromMicroscope();
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
toFromPrism_1.startSerial();
//# sourceMappingURL=server.js.map