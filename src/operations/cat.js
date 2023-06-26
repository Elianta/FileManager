import { createReadStream } from "fs";
import { finished } from "stream/promises";
import Operation from "./Operation.js";

const catOperation = new Operation("cat", async (pathToFile) => {
    const readable = createReadStream(pathToFile, "utf-8");

    try {
        await finished(readable);
    } catch (error) {
        throw new Error("Operation failed");
    }
    readable.pipe(process.stdout);
});

export default catOperation;
