import { IServices } from "../models/Services";

export class Types {
  /**
   * Asynchronously imports all JSON files from the given directory.
   *
   * @param {Record<any, any>} obj - The path to the directory containing JSON files.
   * @param {string} interfaceName - Name of the interface while generation, root name
   * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
   */

  private async generate(
    obj: Record<any, any>,
    interfaceName: string,
  ): Promise<string> {
    const generatedTypes: string[] = [];
    function createInterface(obj: any, name: string) {
      let interfaceStr = `export interface I${name.charAt(0).toUpperCase() + name.slice(1)} {\n`;
      for (const key in obj) {
        const value = obj[key];
        let type: string = typeof value;
        if (Array.isArray(value)) {
          if (value.length > 0) {
            const arrayValue = value[0];
            let arrayType = typeof arrayValue;
            if (arrayType === "object" && arrayValue !== null) {
              const arrayInterfaceName = `${capitalizeFirstLetter(key)}Entity`;
              createInterface(arrayValue, arrayInterfaceName);
              type = `${arrayInterfaceName}[]`;
            } else {
              type = `${arrayType}[]`;
            }
          } else {
            type = "any[]";
          }
        } else if (type === "object" && value !== null) {
          const subInterfaceName = `${capitalizeFirstLetter(key)}`;
          createInterface(value, subInterfaceName);
          type = subInterfaceName;
        }
        interfaceStr += `  ${key}: ${type};\n`;
      }
      interfaceStr += `}\n`;
      generatedTypes.push(interfaceStr);
    }
    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    createInterface(obj, interfaceName);
    return generatedTypes.join("\n");
  }

  /**
   * Initializes the generation of TypeScript interfaces for all configurations in the given JSON object.
   *
   * @param {IServices} json - The service object containing configurations.
   * @returns {Promise<string>} - A promise that resolves to the concatenated TypeScript interfaces as a string.
   */
  async init(json: IServices): Promise<string> {
    const typesArray = await Promise.all(
      structuredClone(json)?.configuration?.map(async (x) => {
        x?.url && delete x.url;
        return await this.generate(x.requestParam, x.endpointName);
      }),
    );

    // Join all the generated interfaces into a single string
    return typesArray.join("\n");
  }
}
