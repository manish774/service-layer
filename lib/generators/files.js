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
exports.GFiles = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const { exec } = require("child_process");
class GFiles {
    generate(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path.dirname(props.fileName);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFile(props.fileName, props.code, { flag: "w" }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(`File ${props.fileName} created successfully.`);
                }
            });
        });
    }
    runFormatter() {
        return __awaiter(this, void 0, void 0, function* () {
            const npmCommand = "npm run format";
            exec(npmCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing npm command: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`npm command stderr: ${stderr}`);
                    return;
                }
                console.log(`npm command stdout: ${stdout}`);
            });
        });
    }
}
exports.GFiles = GFiles;
