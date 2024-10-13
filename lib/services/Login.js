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
exports.Login = void 0;
const axios_1 = require("axios");
class Login {
    login(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.post(`https://localhost:3000/login`, props);
            return data;
        });
    }
    logout(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(`https://localhost:3000/logout`, {
                params: props,
            });
            return data;
        });
    }
    token(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(`https://localhost:3000/logout`, {
                params: props,
            });
            return data;
        });
    }
}
exports.Login = Login;
