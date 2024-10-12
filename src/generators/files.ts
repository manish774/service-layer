import * as fs from "fs";
import * as path from "path";

const { exec } = require("child_process");
interface props {
  fileName: string;
  code: string;
}

export class GFiles {
  async generate(props: { fileName: string; code: string }) {
    const dir = path.dirname(props.fileName);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFile(props.fileName, props.code, { flag: "w" }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`File ${props.fileName} created successfully.`);
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
