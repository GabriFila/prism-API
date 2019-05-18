"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const updates_route_1 = require("./middlewares/routes/updates-route");
const updates_route_2 = require("./middlewares/routes/updates-route");
const prismState_route_1 = require("./middlewares/routes/prismState-route");
const bodyChecker_1 = require("./middlewares/bodyChecker");
const limitsChecker_1 = require("./middlewares/limitsChecker");
const responseSender_1 = require("./middlewares/responseSender");
const server = express();
updates_route_1.setUpObserver();
//json parser middlware
server.use(bodyParser.json());
server.use(bodyChecker_1.bodyChecker);
//routes
server.use("/prismState", prismState_route_1.prismState);
server.use("/updates", updates_route_2.updates);
server.use(limitsChecker_1.limitsChecker);
server.use(responseSender_1.responseSender);
//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));
//send web app UI
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});
//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));
//# sourceMappingURL=server.js.map