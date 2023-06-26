import { createReadStream, createWriteStream, existsSync } from "fs";
import { pipeline } from "stream/promises";
import { join, basename } from "path";
import { rm } from "fs/promises";
import Operation from "./Operation.js";

const cpOperation = new Operation("cp", async (pathToFile, pathToNewDir) => {
    const fileName = basename(pathToFile);
    const pathToFileNew = join(pathToNewDir, fileName);
    if (existsSync(pathToFileNew)) throw new Error("File already exists");

    const readable = createReadStream(pathToFile, "utf-8");
    const writable = createWriteStream(pathToFileNew);

    try {
        await pipeline(readable, writable);
    } catch (error) {
        await rm(pathToFileNew);
        throw new Error("Operation failed");
    }
});

export default cpOperation;
