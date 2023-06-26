import { writeFile } from "fs/promises";
import { join } from "path";
import Operation from "./Operation.js";

const addOperation = new Operation("add", async (fileName) => {
    const currentDir = process.cwd();
    const pathToFile = join(currentDir, fileName);

    await writeFile(pathToFile, "", { flag: "wx" });
});

export default addOperation;
