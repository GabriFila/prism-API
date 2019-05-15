import * as express from "express";
import { microState, updateEmitter } from "../server";

const updates = express.Router();

updates.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  updateEmitter.on("offset-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.x.current }, "offset-x-updated");
  });

  updateEmitter.on("offset-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.y.current }, "offset-y-updated");
  });
  updateEmitter.on("offset-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.offset.z.current }, "offset-z-updated");
  });

  updateEmitter.on("pixelNumber-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.x.current }, "pixelNumber-x-updated");
  });
  updateEmitter.on("pixelNumber-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.y.current }, "pixelNumber-y-updated");
  });
  updateEmitter.on("pixelNumber-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.z.current }, "pixelNumber-z-updated");
  });

  updateEmitter.on("range-x-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.x.current }, "range-x-updated");
  });
  updateEmitter.on("range-y-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.y.current }, "range-y-updated");
  });
  updateEmitter.on("range-z-updated", () => {
    SSEwrite({ newValue: microState.scanParams.range.z.current }, "range-z-updated");
  });

  updateEmitter.on("dwellTime-updated", () => {
    SSEwrite({ newValue: microState.scanParams.dwellTime }, "dwellTime-updated");
  });

  updateEmitter.on("lasers-updated", () => {
    SSEwrite(microState.lasers, "lasers-updated");
  });

  updateEmitter.on("mode-updated", () => {
    SSEwrite({ mode: microState.mode }, "mode-updated");
  });

  updateEmitter.on("state-updated", () => {
    SSEwrite({ newState: microState }, "state-updated");
  });

  updateEmitter.on("limits-updated", () => {
    SSEwrite(microState, "limits-updated");
  });

  function SSEwrite(input: object, event: string) {
    res.write(`data: ${JSON.stringify(input)} \n`);
    res.write(`event: ${event}\n`);
    res.write(`\n`);
  }
});

module.exports = updates;
