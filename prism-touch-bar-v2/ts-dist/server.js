"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const updates_route_1 = require("./routes/updates-route");
const updates_route_2 = require("./routes/updates-route");
const lasers_route_1 = require("./routes/lasers-route");
const server = express();
updates_route_1.setUpObserver();
//json parser middlware
server.use(bodyParser.json());
server.use(require("./middlewares/bodyChecker"));
//routes
//server.use("/prismState", require("./routes/prismState-route"));
//server.use("/prismMotors", require("./routes/prismMotors-route"));
server.use("/updates", updates_route_2.updates);
server.use("/lasers", lasers_route_1.lasers);
server.use(require("./middlewares/limitsChecker"));
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