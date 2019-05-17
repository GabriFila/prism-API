declare namespace Express {
  export interface Response {
    resource?: Resource;
    errors?: string[];
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