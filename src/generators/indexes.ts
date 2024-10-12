import { IServices } from "../models/Services";

export class Indexes {
  completeString: string = "";
  async generate(serviceObject: IServices) {
    const serviceFuncNames = serviceObject.configuration.map(
      (x) => x.endpointName,
    );

    return (this.completeString += `export {${serviceFuncNames}} from "./${serviceObject.serviceName}";`);
  }
  async init(serviceObject: IServices) {
    return this.generate(serviceObject);
  }
}
