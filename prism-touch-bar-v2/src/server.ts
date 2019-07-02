import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as observer from "node-observer";

import { bodyChecker } from "./middlewares/bodyChecker";
import { updates } from "./middlewares/routes/updates-route";
import { prismState } from "./middlewares/routes/prismState-route";
import { limitsChecker } from "./middlewares/limitsChecker";
import { responseSender } from "./middlewares/responseSender";
import { tryToConnectToMicro } from "./toFromMicro";

//set right enviromment variables
if (process.argv[2] === undefined) {
  console.log("dev mode");
  dotenv.config({ path: "./variables.dev.env" });
} else if (process.argv[2] === "prod") {
  console.log("prod mode");
  dotenv.config({ path: "./variables.prod.env" });
}

export const server = express();
let isMicroConnected: boolean = false;

//middleware to parse body
server.use(bodyParser.json());

//middleware to check if body has newValue field
server.use(bodyChecker);

//routes
server.use("/prismState", prismState);
server.use("/updates", updates);

//middleware to check limit
server.use(limitsChecker);

//middleware to send succes response back and make necessary API updates
server.use(responseSender);

//static file to render UI on clients
server.use("/public", express.static(path.join(__dirname + "/../../public")));

//send web app UI or connection waiting screen
server.get("/", (req, res) => {
  if (isMicroConnected) {
    res.sendFile(path.join(__dirname + "/../../public/views/mainUI.html"));
  } else res.sendFile(path.join(__dirname + "/../../public/views/waitConnect.html"));
});

//keeo trying to make a connection when previous attemp failed
observer.subscribe(this, "micro-not-connected", () => {
  isMicroConnected = false;
  setTimeout(tryToConnectToMicro, 1000);
});
//connection succeded
observer.subscribe(this, "micro-connected", () => {
  isMicroConnected = true;
});

//first attemp to connect
tryToConnectToMicro();

//start server
let port = process.env.PORT;
server.listen(port, () => console.log(`Listening from ${port}`));
