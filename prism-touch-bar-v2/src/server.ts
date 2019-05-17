import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { setUpObserver } from "./routes/updates-route";

import { updates } from "./routes/updates-route";
import { prismState } from "./routes/prismState-route";

import { bodyChecker } from "./middlewares/bodyChecker";
import { limitsChecker } from "./middlewares/limitsChecker";
import { responseSender } from "./middlewares/responseSender";
import { prismMotors } from "./routes/prismMotors-route";

const server = express();

setUpObserver();

//json parser middlware
server.use(bodyParser.json());
server.use(bodyChecker);

//routes
server.use("/prismState", prismState);
server.use("/prismMotors", prismMotors);
server.use("/updates", updates);
server.use(limitsChecker);
server.use(responseSender);

//static file to render UI on client
server.use("/public", express.static(path.join(__dirname + "/../public")));

//send web app UI
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/views/mainUI.html"));
});

//Start server
let port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Listening from ${port}`));
