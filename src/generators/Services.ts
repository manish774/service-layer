import { IServices } from "../models/Services";
import {
  createTemplateLiteralForUrl,
  getFirstLetterAsCapital,
  getLiterals,
} from "../utils/generateUtils";

export class Services {
  private async generate(xjson: IServices) {
    let str = "";
    xjson.configuration.map(
      (xj) =>
        (str += getLiterals(
          xj.endpointName,
          xj.url || "",
          xjson.serviceDomain,
          xj.method,
        )),
    );
    return str;
  }

  generateImports(json: IServices): string {
    let str = "";
    str += `import axios from 'axios';`;
    const serviceFuncNames = json.configuration.map(
      (x) =>
        `I${x.endpointName.charAt(0).toUpperCase() + x.endpointName.slice(1)}`,
    );
    return (
      str + `import {${serviceFuncNames}} from "../models/${json.serviceName}";`
    );
  }
  /**
   * Generate string for all the function of services including interface added.
   * @param {Record<any, any>} json - The path to the directory containing JSON files.
   * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
   */
  async init(json: IServices): Promise<string> {
    const xJson = { ...json };
    let completeString: string = this.generateImports(xJson);

    completeString += `export class ${getFirstLetterAsCapital(xJson.serviceName)}{`;

    let functionStr = await this.generate(json);
    completeString += functionStr;
    completeString += "}";

    return completeString;
  }
}
