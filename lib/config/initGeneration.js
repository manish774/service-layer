"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const main_1 = require("../generators/main");
const generateUtils_1 = require("../utils/generateUtils");
class Initgeneration {
    /**
     * Asynchronously imports all JSON files from the given directory.
     *
     * @param {string} directory - The path to the directory containing JSON files.
     * @returns {Promise<{ [key: string]: any }>} - A promise that resolves to an object with filenames as keys and JSON data as values.
     */
    importAllJsons(directory) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonFiles = {};
            const files = fs.readdirSync(directory);
            for (const file of files) {
                if (file.endsWith(".json")) {
                    const filePath = path.join(directory, file);
                    const jsonData = yield Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
                    jsonFiles[file] = jsonData;
                }
            }
            return jsonFiles;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const main = new main_1.Main();
            const jsons = yield this.importAllJsons(path.resolve(__dirname, "../raw-service-config"));
            yield Promise.all(Object.keys(jsons).map((key) => main.generate(jsons[key])));
            (0, generateUtils_1.runFormatter)();
        });
    }
}
const generation = new Initgeneration();
generation.init();
