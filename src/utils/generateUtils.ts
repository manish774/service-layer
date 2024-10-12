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

export const getLiterals = (apiName: string, url: string) => {
  return `\n\n
        export const  ${apiName} = async (props:${getFirstLetterAsCapital(apiName)}) =>{
               const fetchData = await fetch(\`${createTemplateLiteralForUrl(url)}\`,{
                    method:'POST',
                    body: JSON.stringify(props)
                })
              const data = await fetchData.json()
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
