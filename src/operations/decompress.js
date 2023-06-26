import { createReadStream, createWriteStream, existsSync } from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { join, basename } from "path";
import { rm } from "fs/promises";
import Operation from "./Operation.js";

const decompressOperation = new Operation(
    "decompress",
    async (pathToFile, pathToDestination) => {
        let fileName = basename(pathToFile);
        if (fileName.endsWith(".br")) {
            fileName = fileName.slice(0, -3);
        } else {
            throw new Error("Invalid input");
        }

        const pathToFileNew = join(pathToDestination, fileName);
        if (existsSync(pathToFileNew)) throw new Error("File already exists");

        const readable = createReadStream(pathToFile);
        const writable = createWriteStream(pathToFileNew);
        const decompress = createBrotliDecompress();

        try {
            await pipeline(readable, decompress, writable);
            await rm(pathToFile);
        } catch (error) {
            await rm(pathToFileNew);
            throw new Error("Operation failed");
        }
    }
);

export default decompressOperation;
