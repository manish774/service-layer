import { IServices } from "../models/Services";
export declare class Types {
    /**
     * Asynchronously imports all JSON files from the given directory.
     *
     * @param {Record<any, any>} obj - The path to the directory containing JSON files.
     * @param {string} interfaceName - Name of the interface while generation, root name
     * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
     */
    private generate;
    /**
     * Initializes the generation of TypeScript interfaces for all configurations in the given JSON object.
     *
     * @param {IServices} json - The service object containing configurations.
     * @returns {Promise<string>} - A promise that resolves to the concatenated TypeScript interfaces as a string.
     */
    init(json: IServices): Promise<string>;
}
