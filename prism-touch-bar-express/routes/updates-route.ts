import * as express from "express";
import { microState } from "../toFromPrism";
import { updateEmitter, sendUpdateToPrism } from "../toFromPrism";

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
    let newValue = microState.scanParams.pixelNumber.x.current;
    SSEwrite({ newValue }, "updated-pixelNumber-x");
    sendUpdateToPrism("updated-pixelNumber-x", { newValue });
  });
  updateEmitter.on("UI-updated-pixelNumber-y", () => {
    let newValue = microState.scanParams.pixelNumber.y.current;
    SSEwrite({ newValue }, "updated-pixelNumber-y");
    sendUpdateToPrism("updated-pixelNumber-y", { newValue });
  });
  updateEmitter.on("UI-updated-pixelNumber-z", () => {
    let newValue = microState.scanParams.pixelNumber.z.current;
    
    SSEwrite({ newValue }, "updated-pixelNumber-z");
    sendUpdateToPrism("updated-pixelNumber-z", { newValue });
  });

  updateEmitter.on("UI-updated-range-x", () => {
    let newValue = microState.scanParams.range.x.current;
    SSEwrite({ newValue }, "updated-range-x");
    sendUpdateToPrism("updated-range-x", { newValue });
  });
  updateEmitter.on("UI-updated-range-y", () => {
    let newValue = microState.scanParams.range.y.current;
    SSEwrite({ newValue }, "updated-range-y");
    sendUpdateToPrism("updated-range-y", { newValue });
  });
  updateEmitter.on("UI-updated-range-z", () => {
    let newValue = microState.scanParams.range.z.current;
    SSEwrite({ newValue }, "updated-range-z");
    sendUpdateToPrism("updated-range-z", { newValue });
  });

  updateEmitter.on("UI-updated-dwellTime", () => {
    let newValue = microState.scanParams.dwellTime;
    SSEwrite({ newValue }, "updated-dwellTime");
    sendUpdateToPrism("updated-dwellTime", { newValue });
  });

  updateEmitter.on("UI-updated-lasers", () => {
    let lasers = microState.lasers;
    SSEwrite(lasers, "updated-lasers");
    sendUpdateToPrism("updated-lasers", { lasers });
  });

  updateEmitter.on("UI-updated-mode", () => {
    let newMode = microState.mode;
    SSEwrite({ newMode }, "updated-mode");
    sendUpdateToPrism("updated-mode", { mode: newMode });
  });

  updateEmitter.on("UI-updated-state", () => {
    let newState = microState;
    SSEwrite({ newState }, "updated-state");
    sendUpdateToPrism("updated-state", newState);
  });

  updateEmitter.on("limits-updated", () => {
    SSEwrite(microState, "limits-updated");
  });

  updateEmitter.on("micro-updated-offset-x", () => {
    let newValue = microState.scanParams.offset.x.current;
    SSEwrite({ newValue }, "updated-offset-x");
  });

  updateEmitter.on("micro-updated-offset-y", () => {
    let newValue = microState.scanParams.offset.y.current;
    SSEwrite({ newValue }, "updated-offset-y");
  });
  updateEmitter.on("micro-updated-offset-z", () => {
    let newValue = microState.scanParams.offset.z.current;
    SSEwrite({ newValue }, "updated-offset-z");
  });

  updateEmitter.on("micro-updated-pixelNumber-x", () => {
    let newValue = microState.scanParams.pixelNumber.x.current;
    SSEwrite({ newValue }, "updated-pixelNumber-x");
  });
  updateEmitter.on("micro-updated-pixelNumber-y", () => {
    let newValue = microState.scanParams.pixelNumber.y.current;
    SSEwrite({ newValue }, "updated-pixelNumber-y");
  });
  updateEmitter.on("micro-updated-pixelNumber-z", () => {
    let newValue = microState.scanParams.pixelNumber.z.current;
    SSEwrite({ newValue }, "updated-pixelNumber-z");
  });

  updateEmitter.on("micro-updated-range-x", () => {
    let newValue = microState.scanParams.range.x.current;
    SSEwrite({ newValue }, "updated-range-x");
  });
  updateEmitter.on("micro-updated-range-y", () => {
    let newValue = microState.scanParams.range.y.current;
    SSEwrite({ newValue }, "updated-range-y");
  });
  updateEmitter.on("micro-updated-range-z", () => {
    let newValue = microState.scanParams.range.z.current;
    SSEwrite({ newValue }, "updated-range-z");
  });

  updateEmitter.on("micro-updated-dwellTime", () => {
    let newValue = microState.scanParams.dwellTime;
    SSEwrite({ newValue }, "updated-dwellTime");
  });

  updateEmitter.on("micro-updated-lasers", () => {
    let lasers = microState.lasers;
    SSEwrite(lasers, "updated-lasers");
  });

  updateEmitter.on("micro-updated-mode", () => {
    let newMode = microState.mode;
    SSEwrite({ newMode }, "updated-mode");
  });

  updateEmitter.on("micro-updated-state", () => {
    let newState = microState;
    SSEwrite({ newState }, "updated-state");
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


