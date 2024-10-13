"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config = {
    baseURL: "https://localhost:3000",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${process.env.BASIC}`,
    },
};
const pagarmeApi = axios_1.default.create(config);
exports.default = pagarmeApi;
