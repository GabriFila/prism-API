import { UIparameters, getXYZproperties } from "./scanParameteres";
import { ScanParams } from "../../model";

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
    limits.find(limit => limit.id == (scanParams as any)[prop].x.name).max = (scanParams as any)[prop].x.max;
    limits.find(limit => limit.id == (scanParams as any)[prop].x.name).min = (scanParams as any)[prop].x.min;

    limits.find(limit => limit.id == (scanParams as any)[prop].y.name).max = (scanParams as any)[prop].y.max;
    limits.find(limit => limit.id == (scanParams as any)[prop].y.name).min = (scanParams as any)[prop].y.min;

    limits.find(limit => limit.id == (scanParams as any)[prop].z.name).max = (scanParams as any)[prop].z.max;
    limits.find(limit => limit.id == (scanParams as any)[prop].z.name).min = (scanParams as any)[prop].z.min;
  });

  limits.find(limit => limit.id == "scanParams-dwellTime").max = scanParams.dwellTime.max;
}
