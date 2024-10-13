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
exports.RootIndex = exports.Indexes = void 0;
class Indexes {
    constructor() {
        this.completeString = "";
    }
    generate(serviceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.completeString += `export {${serviceObject.serviceName}} from "./${serviceObject.serviceName}";`);
        });
    }
    init(serviceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.generate(serviceObject);
        });
    }
}
exports.Indexes = Indexes;
class RootIndex {
    constructor() {
        this.completeString = "";
    }
    generate(serviceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.completeString += `export * from "./services";`);
        });
    }
    init(serviceObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.generate(serviceObject);
        });
    }
}
exports.RootIndex = RootIndex;
