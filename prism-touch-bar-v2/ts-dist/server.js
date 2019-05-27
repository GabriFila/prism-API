"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const observer = require("node-observer");
const updates_route_1 = require("./middlewares/routes/updates-route");
const prismState_route_1 = require("./middlewares/routes/prismState-route");
const bodyChecker_1 = require("./middlewares/bodyChecker");
const limitsChecker_1 = require("./middlewares/limitsChecker");
const responseSender_1 = require("./middlewares/responseSender");
const toFromMicro_1 = require("./toFromMicro");
if (process.argv[2] === undefined) {
    dotenv.config({ path: "./variables.dev.env" });
}
else if (process.argv[2] === "-prod") {
    dotenv.config({ path: "./variables.prod.env" });
}
console.log(process.env.ENV);
const server = express();
let isMicroConnected = false;
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
    if (isMicroConnected) {
        res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
    }
    else
        res.sendFile(path.join(__dirname + "/../public/views/connect.html"));
});
observer.subscribe(this, "micro-not-connected", () => {
    isMicroConnected = false;
    setTimeout(toFromMicro_1.tryToConnectToMicro, 1000);
});
observer.subscribe(this, "micro-connected", () => {
    isMicroConnected = true;
});
toFromMicro_1.tryToConnectToMicro();
//Start server
let port = process.env.PORT;
server.listen(5000, () => console.log(`Listening from ${port}`));
//# sourceMappingURL=server.js.map