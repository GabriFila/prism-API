import * as express from "express";
import { microState, updateEmitter } from "../server";

const updates = express.Router();

/*
updates.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  updateSender.on("temp", () => console.log("temp emitted"));

  updateSender.on("offset-x-updated", () => {
    console.log("about to send offset x update");

    SSEwrite({ newValue: microState.scanParams.offset.x.current }, "offset-x-updated");
  });
  updateSender.on("offset-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.y.current }, "offset-y-updated");
  });
  updateSender.on("offset-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.z.current }, "offset-z-updated");
  });

  updateSender.on("pixelNumber-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.x.current }, "pixelNumber-x-updated");
  });
  updateSender.on("pixelNumber-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.y.current }, "pixelNumber-y-updated");
  });
  updateSender.on("pixelNumber-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.z.current }, "pixelNumber-z-updated");
  });

  updateSender.on("range-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.x.current }, "range-x-updated");
  });
  updateSender.on("range-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.y.current }, "range-y-updated");
  });
  updateSender.on("range-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.z.current }, "range-z-updated");
  });

  updateSender.on("dwellTime-updated", () => {
    SSEwrite({ newValue: microState.scanParams.dwellTime }, "dwellTime-updated");
  });

  updateSender.on("lasers-updated", () => {
    SSEwrite(microState.lasers, "lasers-updated");
  });

  updateSender.on("mode-updated", () => {
    SSEwrite({ mode: microState.mode }, "mode-updated");
  });

  function SSEwrite(input: object, event: string) {
    res.write(`data: ${JSON.stringify(input)} \n`);
    res.write(`event: ${event}\n`);
    res.write(`\n`);
  }
});
*/
module.exports = updates;
