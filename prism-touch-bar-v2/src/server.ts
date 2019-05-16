import * as express from "express";
import * as path from "path";
import bodyParser = require("body-parser");
// import { Motors } from "./resource-class";

const server = express();
//export const motorValues = new Motors();


//json parser middlware
server.use(bodyParser.json());

//routes
server.use("/prismState", require("./routes/prismState-route"));
server.use("/prismMotors", require("./routes/prismMotors-route"));
server.use("/updates", require("./routes/updates-route"));

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});

//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));
