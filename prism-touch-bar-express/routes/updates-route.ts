import * as express from "express";
import { microState } from "../server";
import { updateEmitter, sendUpdateToPrism } from "../updatePrism";

const updates = express.Router();

updates.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  updateEmitter.on("UI-updated-offset-x", () => {
    let newValue = microState.scanParams.offset.x.current;
    SSEwrite({ newValue }, "updated-offset-x");
    sendUpdateToPrism("updated-offset-x", { newValue });
  });

  updateEmitter.on("UI-updated-offset-y", () => {
    let newValue = microState.scanParams.offset.y.current;
    SSEwrite({ newValue }, "updated-offset-y");
    sendUpdateToPrism("updated-offset-y", { newValue });
  });
  updateEmitter.on("UI-updated-offset-z", () => {
    let newValue = microState.scanParams.offset.z.current;
    SSEwrite({ newValue }, "updated-offset-z");
    sendUpdateToPrism("updated-offset-z", { newValue });
  });

  updateEmitter.on("UI-updated-pixelNumber-x", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.x.current }, "updated-pixelNumber-x");
  });
  updateEmitter.on("UI-updated-pixelNumber-y", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.y.current }, "updated-pixelNumber-y");
  });
  updateEmitter.on("UI-updated-pixelNumber-z", () => {
    SSEwrite({ newValue: microState.scanParams.pixelNumber.z.current }, "updated-pixelNumber-z");
  });

  updateEmitter.on("UI-updated-range-x", () => {
    SSEwrite({ newValue: microState.scanParams.range.x.current }, "updated-range-x");
  });
  updateEmitter.on("UI-updated-range-y", () => {
    SSEwrite({ newValue: microState.scanParams.range.y.current }, "updated-range-y");
  });
  updateEmitter.on("UI-updated-range-z", () => {
    SSEwrite({ newValue: microState.scanParams.range.z.current }, "updated-range-z");
  });

  updateEmitter.on("UI-updated-dwellTime", () => {
    SSEwrite({ newValue: microState.scanParams.dwellTime }, "dwellTime-updated");
  });

  updateEmitter.on("UI-updated-lasers", () => {
    SSEwrite(microState.lasers, "lasers-updated");
  });

  updateEmitter.on("UI-updated-mode", () => {
    SSEwrite({ mode: microState.mode }, "mode-updated");
  });

  updateEmitter.on("UI-updated-state", () => {
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
