import * as fs from "fs";

const { exec } = require("child_process");

interface props {
  fileName: string;
  code: string;
}

// export const generate = (props: props) => {
//   fs.writeFile(props.fileName, props?.code, { flag: "w" }, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// };

// export const runFormatter = () => {
//   const npmCommand = "npm run format";

//   exec(npmCommand, (error: any, stdout: any, stderr: any) => {
//     if (error) {
//       console.error(`Error executing npm command: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`npm command stderr: ${stderr}`);
//       return;
//     }
//     console.log(`npm command stdout: ${stdout}`);
//   });
// };

export class GFiles {
  async generate(props: props) {
    fs.writeFile(props.fileName, props?.code, { flag: "w" }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  async runFormatter() {
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
  }
}
