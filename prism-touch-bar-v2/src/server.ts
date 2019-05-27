import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as observer from "node-observer";

import { updates } from "./middlewares/routes/updates-route";
import { prismState } from "./middlewares/routes/prismState-route";

import { bodyChecker } from "./middlewares/bodyChecker";
import { limitsChecker } from "./middlewares/limitsChecker";
import { responseSender } from "./middlewares/responseSender";
import { tryToConnectToMicro } from "./toFromMicro";

if (process.argv[2] === undefined) {
  dotenv.config({ path: "./variables.dev.env" });
} else if (process.argv[2] === "-prod") {
  dotenv.config({ path: "./variables.prod.env" });
}

const server = express();
let isMicroConnected: boolean = false;

server.use(bodyParser.json());
server.use(bodyChecker);

//routes
server.use("/prismState", prismState);
server.use("/updates", updates);
server.use(limitsChecker);
server.use(responseSender);

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));

//send web app UI
server.get("/", (req, res) => {
  if (isMicroConnected) {
    res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
  } else res.sendFile(path.join(__dirname + "/../public/views/connect.html"));
});

observer.subscribe(this, "micro-not-connected", () => {
  isMicroConnected = false;
  setTimeout(tryToConnectToMicro, 1000);
});
observer.subscribe(this, "micro-connected", () => {
  isMicroConnected = true;
});

tryToConnectToMicro();

//Start server
let port = process.env.PORT;
server.listen(5000, () => console.log(`Listening from ${port}`));
