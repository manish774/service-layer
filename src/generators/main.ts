import { IServices } from "../models/Services";
import { GFiles } from "./files";
import { Types } from "./Types";
const types = new Types();
const gfiles = new GFiles();

export class Main {
  completeString: string;

  constructor() {
    this.completeString = "";
  }

  async generate(serviceObject: IServices): Promise<string> {
    const all = serviceObject?.configuration?.map((x) =>
      types.generate(x.requestParam, x.endpointName)
    );

    return Promise.all(all).then((x) => {
      gfiles.generate({
        fileName: `src/servicess/${"serviceName"}.ts`,
        code: x[0],
      });
      return x.toString();
    });
  }
}
