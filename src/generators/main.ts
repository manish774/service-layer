import { IServices } from "../models/Services";
import { GFiles } from "./files";
import { Services } from "./Services";
import { Types } from "./Types";
const types = new Types();
const gfiles = new GFiles();
const services = new Services();

export class Main {
  completeString: string;

  constructor() {
    this.completeString = "";
  }

  async generate(serviceObject: IServices): Promise<void> {
    const generatedTypes = {
      nameOfFile: serviceObject.serviceName,
      content: await types.init(serviceObject),
      fileType: "typegeneration",
    };

    const generatedServices = {
      nameOfFile: serviceObject.serviceName,
      content: await services.init(serviceObject),
      fileType: "servicegeneration",
    };

    const results = await Promise.all([generatedTypes, generatedServices]);

    results.map((x) => {
      if (x.fileType === "servicegeneration")
        gfiles.generate({
          fileName: `src/generated/services/${x.nameOfFile}.ts`,
          code: x?.content,
        });

      if (x.fileType === "typegeneration") {
        gfiles.generate({
          fileName: `src/generated/models/${x.nameOfFile}.d.ts`,
          code: x.content,
        });
      }
    });
  }
}
