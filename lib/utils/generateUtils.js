"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFormatter = exports.getFirstLetterAsCapital = exports.getLiterals = exports.createTemplateLiteralForUrl = void 0;
const { exec } = require("child_process");
const createTemplateLiteralForUrl = (templateString) => {
    const regex = /\{([^}]+)\}/g;
    const placeholders = templateString.match(regex);
    const props = {};
    if (placeholders) {
        placeholders.forEach((placeholder) => {
            const key = placeholder.substring(1, placeholder.length - 1);
            props[key] = `\${props?.${key}}`;
        });
    }
    const modifiedString = templateString.replace(regex, (match, placeholder) => {
        return props[placeholder] || match;
    });
    return modifiedString;
};
exports.createTemplateLiteralForUrl = createTemplateLiteralForUrl;
const getLiterals = (apiName, url, domain, method) => {
    return method.toLocaleLowerCase() === "post"
        ? `\n\n
           async ${apiName}(props:I${(0, exports.getFirstLetterAsCapital)(apiName)}){
               const { data } = await axios.post(\`${domain}${(0, exports.createTemplateLiteralForUrl)(url)}\`, props);
               return data;
    }`
        : `\n\n
           async ${apiName}(props:I${(0, exports.getFirstLetterAsCapital)(apiName)}){
               const { data } = await axios.get(\`${domain}${(0, exports.createTemplateLiteralForUrl)(url)}\`, { params: props });
               return data;
    }`;
};
exports.getLiterals = getLiterals;
const getFirstLetterAsCapital = (label) => {
    return label.charAt(0).toUpperCase() + label.slice(1);
};
exports.getFirstLetterAsCapital = getFirstLetterAsCapital;
const runFormatter = () => {
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
};
exports.runFormatter = runFormatter;
