import { IServices } from "../models/Services";
export declare class Main {
    completeString: string;
    constructor();
    generate(serviceObject: IServices): Promise<void>;
}
