export class Motors {
    xSteps: number;
    ySteps: number;
    zSteps: number;
  }
  
  export class State {
    scanParams: ScanParams;
    lasers: Laser[];
    mode: string;
  
    constructor() {
      this.scanParams = new ScanParams();
      this.lasers = [new Laser(), new Laser(), new Laser(), new Laser()];
      this.mode = "stand-by";
    }
  }
  
  class Laser {
    power: number;
    waveLength: number;
    isOn: boolean;
    constructor() {
      this.power = null;
      this.waveLength = null;
      this.isOn = false;
    }
  }
  
  class ScanParams {
    offset: XYZ;
  
    pixelNumber: XYZ;
  
    range: XYZ;
  
    dwellTime: number;
  
    constructor() {
      this.offset = new XYZ();
      this.pixelNumber = new XYZ();
      this.range = new XYZ();
      this.dwellTime = null;
    }
  }
  
  //for XYZ parameters
  class XYZ {
    x: CurrMaxMin;
    y: CurrMaxMin;
    z: CurrMaxMin;
    constructor() {
      this.x = new CurrMaxMin();
      this.y = new CurrMaxMin();
      this.z = new CurrMaxMin();
    }
  }
  
  //Current Value, Max Value, Min Value
  class CurrMaxMin {
    current: number;
    max: number;
    min: number;
  
    constructor() {
      this.current = null;
      this.max = Number.POSITIVE_INFINITY;
      this.min = Number.NEGATIVE_INFINITY;
    }
  }
  