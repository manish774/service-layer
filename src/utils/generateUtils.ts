const { exec } = require("child_process");

export const createTemplateLiteralForUrl = (templateString: string): string => {
  const regex: RegExp = /\{([^}]+)\}/g;
  const placeholders: RegExpMatchArray | null = templateString.match(regex);
  const props: { [key: string]: string } = {};
  if (placeholders) {
    placeholders.forEach((placeholder: string) => {
      const key: string = placeholder.substring(1, placeholder.length - 1);
      props[key] = `\${props?.${key}}`;
    });
  }
  const modifiedString: string = templateString.replace(
    regex,
    (match: string, placeholder: string) => {
      return props[placeholder] || match;
    },
  );
  return modifiedString;
};

export const getLiterals = (
  apiName: string,
  url: string,
  domain: string,
  method: string,
) => {
  return method.toLocaleLowerCase() === "post"
    ? `\n\n
           async ${apiName}(props:I${getFirstLetterAsCapital(apiName)}){
               const { data } = await axios.post(\`${domain}${createTemplateLiteralForUrl(url)}\`, props);
               return data;
    }`
    : `\n\n
           async ${apiName}(props:I${getFirstLetterAsCapital(apiName)}){
               const { data } = await axios.get(\`${domain}${createTemplateLiteralForUrl(url)}\`, { params: props });
               return data;
    }`;
};

export const getFirstLetterAsCapital = (label: string) => {
  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const runFormatter = () => {
  const npmCommand = "npm run format";

  exec(npmCommand, (error: any, stdout: any, stderr: any) => {
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
