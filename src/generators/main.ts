import { IServices } from "../models/Services";
import { GFiles } from "./files";
import { Indexes } from "./indexes";
import { Services } from "./Services";
import { Types } from "./Types";
const types = new Types();
const gfiles = new GFiles();
const services = new Services();
const indexes = new Indexes();

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

    const generateIndexFile = {
      nameOfFile: serviceObject.serviceName,
      content: await indexes.init(serviceObject),
      fileType: "generateindexes",
    };

    const results = await Promise.all([
      generatedTypes,
      generatedServices,
      generateIndexFile,
    ]);

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

      if (x.fileType === "generateindexes") {
        gfiles.generate({
          fileName: `src/generated/services/index.ts`,
          code: x.content,
        });
      }
    });
  }
}
