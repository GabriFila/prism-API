declare namespace Express {
  export interface Response {
    resource?: Resource;
    toGet ?: any;
  }
}

declare namespace Express {
  export interface Resource {
    name: string;
    value: number | boolean;
    unit?: string;
    min?: number;
    max?: number;
  }
}