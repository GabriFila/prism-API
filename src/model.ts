
// interfaces for microstate objects
export interface MicroState {
  scanParams: ScanParams;
  lasers: Laser[];
  mode: Resource;
  motors: XYZ;
}
export interface ScanParams {
  offset: XYZ;
  pixelNumber: XYZ;
  range: XYZ;
  dwellTime: Resource;

  [key: string]: XYZ | Resource;
}

export interface XYZ {
  x: Resource;
  y: Resource;
  z: Resource;
  [key: string]: Resource;
}

export interface Laser {
  waveLength: Resource;
  power: Resource;
  isOn: Resource;
  isPresent: Resource;
}

export interface Resource {
  id: string;
  value: number | boolean | string;
  unit?: string;
  min?: number;
  max?: number;
}

//make microstate object from json model
export let microState: MicroState = require("../../microState.json");
