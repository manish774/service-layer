import * as fs from "fs";
import * as path from "path";
import { Main } from "../generators/main";

class Initgeneration {
  /**
   * Asynchronously imports all JSON files from the given directory.
   *
   * @param {string} directory - The path to the directory containing JSON files.
   * @returns {Promise<{ [key: string]: any }>} - A promise that resolves to an object with filenames as keys and JSON data as values.
   */

  async importAllJsons(directory: string): Promise<{ [key: string]: any }> {
    const jsonFiles: { [key: string]: any } = {};
    const files = fs.readdirSync(directory);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(directory, file);
        const jsonData = await import(filePath);
        jsonFiles[file] = jsonData;
      }
    }
    return jsonFiles;
  }

  async init() {
    const init = new Main();
    const jsons = await this.importAllJsons(
      path.resolve(__dirname, "../raw-service-config")
    );

    const promises = [];
    for (let key in jsons) {
      promises.push(init.generate(jsons[key]));
    }

    Promise.all(promises).then((resp) => {
      console.log(resp);
    });
  }
}

const generation = new Initgeneration();
generation.init();
