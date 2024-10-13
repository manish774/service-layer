"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const generateUtils_1 = require("../utils/generateUtils");
class Services {
    generate(xjson) {
        return __awaiter(this, void 0, void 0, function* () {
            let str = "";
            xjson.configuration.map((xj) => (str += (0, generateUtils_1.getLiterals)(xj.endpointName, xj.url || "", xjson.serviceDomain, xj.method)));
            return str;
        });
    }
    generateImports(json) {
        let str = "";
        str += `import axios from 'axios';`;
        const serviceFuncNames = json.configuration.map((x) => `I${x.endpointName.charAt(0).toUpperCase() + x.endpointName.slice(1)}`);
        return (str + `import {${serviceFuncNames}} from "../models/${json.serviceName}";`);
    }
    /**
     * Generate string for all the function of services including interface added.
     * @param {Record<any, any>} json - The path to the directory containing JSON files.
     * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
     */
    init(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const xJson = Object.assign({}, json);
            let completeString = this.generateImports(xJson);
            completeString += `export class ${(0, generateUtils_1.getFirstLetterAsCapital)(xJson.serviceName)}{`;
            let functionStr = yield this.generate(json);
            completeString += functionStr;
            completeString += "}";
            return completeString;
        });
    }
}
exports.Services = Services;
