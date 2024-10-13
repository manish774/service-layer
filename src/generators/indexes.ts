import { IServices } from "../models/Services";

export class Indexes {
  completeString: string = "";
  async generate(serviceObject: IServices) {
    return (this.completeString += `export {${serviceObject.serviceName}} from "./${serviceObject.serviceName}";`);
  }
  async init(serviceObject: IServices) {
    return this.generate(serviceObject);
  }
}

export class RootIndex {
  completeString: string = "";
  async generate(serviceObject: IServices) {
    return (this.completeString += `export * from "./services";`);
  }
  async init(serviceObject: IServices) {
    return this.generate(serviceObject);
  }
}
