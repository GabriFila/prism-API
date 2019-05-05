export class Motors {
  xSteps: number;
  ySteps: number;
  zSteps: number;
}

export class State {
  scanParams: ScanParams;
  lasers: Laser[];

  constructor() {
    this.scanParams = new ScanParams();
    this.lasers = [new Laser(), new Laser(), new Laser(), new Laser()];
  }
}

class Laser {
  power: number;
  waveLength: number;
  isOn: boolean;
  constructor() {
    this.power = null;
    this.waveLength = null;
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
  private _current: number;
  public get current(): number {
    return this._current;
  }
  public set current(value: number) {
    if (value > this.max) console.log("value greater than max");
    //throw new Error(        "bella"`Current Value:${this._current} exceeded Max value:${this.max}`      );
    else if (value < this.min) console.log("value lower than min");

    //throw new Error(        "bella"`Current Value:${this._current} exceeded Min value:${this.min}`      );

    this._current = value;
  }
  max: number;
  min: number;

  constructor() {
    this._current = null;
    this.max = Number.POSITIVE_INFINITY;
    this.min = Number.POSITIVE_INFINITY;
  }
}
