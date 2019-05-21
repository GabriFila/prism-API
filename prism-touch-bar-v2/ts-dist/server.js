"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const updates_route_1 = require("./middlewares/routes/updates-route");
const prismState_route_1 = require("./middlewares/routes/prismState-route");
const bodyChecker_1 = require("./middlewares/bodyChecker");
const limitsChecker_1 = require("./middlewares/limitsChecker");
const responseSender_1 = require("./middlewares/responseSender");
const toFromMicro_1 = require("./toFromMicro");
const server = express();
let microConnected = false;
//json parser middlware
server.use(bodyParser.json());
server.use(bodyChecker_1.bodyChecker);
//routes
server.use("/prismState", prismState_route_1.prismState);
server.use("/updates", updates_route_1.updates);
server.use(limitsChecker_1.limitsChecker);
server.use(responseSender_1.responseSender);
//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));
//send web app UI
server.get("/", (req, res) => {
    if (microConnected)
        res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
    else
        res.sendFile(path.join(__dirname + "/../public/views/connect.html"));
});
try {
    toFromMicro_1.connectToMicro();
    microConnected = true;
}
catch (e) {
    microConnected = false;
}
//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));
//# sourceMappingURL=server.js.map