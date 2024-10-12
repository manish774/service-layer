import * as fs from "fs";
import * as path from "path";
import { Main } from "../generators/main";
import { Types } from "../generators/Types";
import { Services } from "../generators/Services";
import { runFormatter } from "../utils/generateUtils";
class Initgeneration {
  /**
   * Asynchronously imports all JSON files from the given directory.
   *
   * @param {string} directory - The path to the directory containing JSON files.
   * @returns {Promise<{ [key: string]: any }>} - A promise that resolves to an object with filenames as keys and JSON data as values.
   */

  private async importAllJsons(
    directory: string,
  ): Promise<{ [key: string]: any }> {
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
    const main = new Main();
    const types = new Types();
    const services = new Services();

    const jsons = await this.importAllJsons(
      path.resolve(__dirname, "../raw-service-config"),
    );

    await Promise.all(
      Object.keys(jsons).map((key) => main.generate(jsons[key])),
    );
    runFormatter();
  }
}

const generation = new Initgeneration();
generation.init();
