import { IServices } from "../models/Services";
export declare class Services {
    private generate;
    generateImports(json: IServices): string;
    /**
     * Generate string for all the function of services including interface added.
     * @param {Record<any, any>} json - The path to the directory containing JSON files.
     * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
     */
    init(json: IServices): Promise<string>;
}
