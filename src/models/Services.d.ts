export interface IServices {
  serviceName: string;
  serviceDomain: string;
  configuration: config[];
}

export interface config {
  endpointName: string;
  method: string;
  url: string;
  requestParam: Record<any, any>;
}
