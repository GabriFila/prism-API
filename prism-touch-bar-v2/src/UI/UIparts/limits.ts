import { UIparameters, getXYZproperties } from "./scanParameteres";
import { ScanParams, XYZ } from "../../model";

class Limit {
  id: string;
  max: number;
  min: number;
  constructor(id: string) {
    this.id = id;
    this.max = Number.POSITIVE_INFINITY;
    this.min = Number.NEGATIVE_INFINITY;
  }

  check(value: number): boolean {
    return value <= this.max && value >= this.min;
  }
}

export const limits: Limit[] = [];
UIparameters.forEach(param => limits.push(new Limit(param.id)));

export function updateLimits(scanParams: ScanParams) {
  getXYZproperties(scanParams).forEach(prop => {
    //updates limit for each scanParam that as xyz
    console.log(scanParams[prop]);
    
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).x.id).max = (scanParams[prop] as XYZ).x.max;
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).x.id).min = (scanParams[prop] as XYZ).x.min;

    limits.find(limit => limit.id == (scanParams[prop] as XYZ).y.id).max = (scanParams[prop] as XYZ).y.max;
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).y.id).min = (scanParams[prop] as XYZ).y.min;

    limits.find(limit => limit.id == (scanParams[prop] as XYZ).z.id).max = (scanParams[prop] as XYZ).z.max;
    limits.find(limit => limit.id == (scanParams[prop] as XYZ).z.id).min = (scanParams[prop] as XYZ).z.min;
  });

  limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
