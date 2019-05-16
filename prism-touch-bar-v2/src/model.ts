
interface MicroState {
  scanParams: ScanParams;
  lasers: Laser[];
  mode: string;
}
interface ScanParams {
  offset: XYZ;
  pixelNumber: XYZ;
  range: XYZ;
  dwellTime: Resource;
}

interface XYZ {
  x: Resource;
  y: Resource;
  z: Resource;
}

interface Laser {
  waveLength: Resource;
  power: Resource;
  isOn: Resource;
  isPresent: Resource;
}

export let microState: MicroState = JSON.parse(require("./resource.json"));

interface Resource {
  name: string;
  value: number;
  unit?: string;
}