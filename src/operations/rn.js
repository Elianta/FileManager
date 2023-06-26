import { rename } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";
import Operation from "./Operation.js";

const rnOperation = new Operation("rn", async (pathToFileOld, newFileName) => {
    const dirName = dirname(pathToFileOld);
    const pathToFileNew = join(dirName, newFileName);
    if (existsSync(pathToFileNew)) throw new Error("File already exists");

    await rename(pathToFileOld, pathToFileNew);
});

export default rnOperation;
