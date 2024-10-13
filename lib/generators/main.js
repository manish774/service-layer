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
exports.Main = void 0;
const files_1 = require("./files");
const indexes_1 = require("./indexes");
const Services_1 = require("./Services");
const Types_1 = require("./Types");
const types = new Types_1.Types();
const gfiles = new files_1.GFiles();
const services = new Services_1.Services();
const indexes = new indexes_1.Indexes();
const rootindex = new indexes_1.RootIndex();
class Main {
    constructor() {
        this.completeString = "";
    }
    generate(serviceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const generatedTypes = {
                nameOfFile: serviceObject.serviceName,
                content: yield types.init(serviceObject),
                fileType: "typegeneration",
            };
            const generatedServices = {
                nameOfFile: serviceObject.serviceName,
                content: yield services.init(serviceObject),
                fileType: "servicegeneration",
            };
            const generateIndexFile = {
                nameOfFile: serviceObject.serviceName,
                content: yield indexes.init(serviceObject),
                fileType: "generateindexes",
            };
            const generateRootIndexFile = {
                nameOfFile: serviceObject.serviceName,
                content: yield rootindex.init(serviceObject),
                fileType: "rootindex",
            };
            const results = yield Promise.all([
                generatedTypes,
                generatedServices,
                generateIndexFile,
                generateRootIndexFile,
            ]);
            results.map((x) => {
                if (x.fileType === "servicegeneration")
                    gfiles.generate({
                        fileName: `src/generated/services/${x.nameOfFile}.ts`,
                        code: x === null || x === void 0 ? void 0 : x.content,
                    });
                if (x.fileType === "typegeneration") {
                    gfiles.generate({
                        fileName: `src/generated/models/${x.nameOfFile}.d.ts`,
                        code: x.content,
                    });
                }
                if (x.fileType === "generateindexes") {
                    gfiles.generate({
                        fileName: `src/generated/services/index.ts`,
                        code: x.content,
                    });
                }
                if (x.fileType === "rootindex") {
                    gfiles.generate({
                        fileName: `src/generated/index.ts`,
                        code: x.content,
                    });
                }
            });
        });
    }
}
exports.Main = Main;
