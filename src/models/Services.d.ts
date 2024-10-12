export interface IServices {
  serviceName: string;
  serviceDomain: string;
  configuration: (
    | {
        endpointName: string;
        method: string;
        url: string;
        requestParam: {
          name: string;
          skills: string[];
        };
      }
    | {
        endpointName: string;
        method: string;
        url: string;
        requestParam?: undefined;
      }
  )[];
}
