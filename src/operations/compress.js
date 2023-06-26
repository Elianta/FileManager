import { createReadStream, createWriteStream, existsSync } from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { join, basename } from "path";
import { rm } from "fs/promises";
import Operation from "./Operation.js";

const compressOperation = new Operation(
    "compress",
    async (pathToFile, pathToDestination) => {
        const fileName = basename(pathToFile);
        const pathToFileNew = join(pathToDestination, `${fileName}.br`);
        if (existsSync(pathToFileNew)) throw new Error("File already exists");

        const readable = createReadStream(pathToFile);
        const writable = createWriteStream(pathToFileNew);
        const compress = createBrotliCompress();

        try {
            await pipeline(readable, compress, writable);
            await rm(pathToFile);
        } catch (error) {
            await rm(pathToFileNew);
            throw new Error("Operation failed");
        }
    }
);

export default compressOperation;
