import { IServices } from "../models/Services";
import {
  createTemplateLiteralForUrl,
  getLiterals,
} from "../utils/generateUtils";

export class Services {
  private async generate(xjson: IServices) {
    let str = "";
    xjson.configuration.map(
      (xj) => (str += getLiterals(xj.endpointName, xj.url)),
    );
    return str;
  }

  /**
   * Generate string for all the function of services including interface added.
   * @param {Record<any, any>} json - The path to the directory containing JSON files.
   * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
   */
  async init(json: IServices): Promise<string> {
    let completeString: string = "";
    const serviceFuncNames = json.configuration.map(
      (x) => x.endpointName.charAt(0).toUpperCase() + x.endpointName.slice(1),
    );
    const importStr = `import {${serviceFuncNames}} from "../models/${json.serviceName}"`;

    let functionStr = await this.generate(json);
    completeString += importStr + functionStr;
    return completeString;
  }
}
