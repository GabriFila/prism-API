"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const server = express();
//json parser middlware
server.use(bodyParser.json());
//routes
//server.use("/prismState", require("./routes/prismState-route"));
//server.use("/prismMotors", require("./routes/prismMotors-route"));
//server.use("/updates", require("./routes/updates-route"));
server.use("/lasers", require("./routes/lasers-route"));
server.use(require("./middlewares/checkLimits"));
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