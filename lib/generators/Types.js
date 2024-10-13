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
exports.Types = void 0;
class Types {
    /**
     * Asynchronously imports all JSON files from the given directory.
     *
     * @param {Record<any, any>} obj - The path to the directory containing JSON files.
     * @param {string} interfaceName - Name of the interface while generation, root name
     * @returns {Promise<string>} - A promise that resolves to an object with Typescript types.
     */
    generate(obj, interfaceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const generatedTypes = [];
            function createInterface(obj, name) {
                let interfaceStr = `export interface I${name.charAt(0).toUpperCase() + name.slice(1)} {\n`;
                for (const key in obj) {
                    const value = obj[key];
                    let type = typeof value;
                    if (Array.isArray(value)) {
                        if (value.length > 0) {
                            const arrayValue = value[0];
                            let arrayType = typeof arrayValue;
                            if (arrayType === "object" && arrayValue !== null) {
                                const arrayInterfaceName = `${capitalizeFirstLetter(key)}Entity`;
                                createInterface(arrayValue, arrayInterfaceName);
                                type = `${arrayInterfaceName}[]`;
                            }
                            else {
                                type = `${arrayType}[]`;
                            }
                        }
                        else {
                            type = "any[]";
                        }
                    }
                    else if (type === "object" && value !== null) {
                        const subInterfaceName = `${capitalizeFirstLetter(key)}`;
                        createInterface(value, subInterfaceName);
                        type = subInterfaceName;
                    }
                    interfaceStr += `  ${key}: ${type};\n`;
                }
                interfaceStr += `}\n`;
                generatedTypes.push(interfaceStr);
            }
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            createInterface(obj, interfaceName);
            return generatedTypes.join("\n");
        });
    }
    /**
     * Initializes the generation of TypeScript interfaces for all configurations in the given JSON object.
     *
     * @param {IServices} json - The service object containing configurations.
     * @returns {Promise<string>} - A promise that resolves to the concatenated TypeScript interfaces as a string.
     */
    init(json) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const typesArray = yield Promise.all((_b = (_a = structuredClone(json)) === null || _a === void 0 ? void 0 : _a.configuration) === null || _b === void 0 ? void 0 : _b.map((x) => __awaiter(this, void 0, void 0, function* () {
                (x === null || x === void 0 ? void 0 : x.url) && delete x.url;
                return yield this.generate(x.requestParam, x.endpointName);
            })));
            // Join all the generated interfaces into a single string
            return typesArray.join("\n");
        });
    }
}
exports.Types = Types;
