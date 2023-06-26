import { createReadStream, createWriteStream, existsSync } from "fs";
import { pipeline } from "stream/promises";
import { join, basename } from "path";
import { rm } from "fs/promises";
import Operation from "./Operation.js";

const mvOperation = new Operation("mv", async (pathToFileOld, pathToNewDir) => {
    const fileName = basename(pathToFileOld);
    const pathToFileNew = join(pathToNewDir, fileName);
    if (existsSync(pathToFileNew)) throw new Error("File already exists");

    const readable = createReadStream(pathToFileOld);
    const writable = createWriteStream(pathToFileNew);

    try {
        await pipeline(readable, writable);
        await rm(pathToFileOld);
    } catch (error) {
        await rm(pathToFileNew);
        throw new Error("Operation failed");
    }
});

export default mvOperation;
