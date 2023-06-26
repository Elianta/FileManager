import { readFile } from "fs/promises";
import { createHash } from "crypto";
import Operation from "./Operation.js";

const hashOperation = new Operation("hash", async (pathToFile) => {
    const contents = await readFile(pathToFile);
    const hexHash = createHash("sha256").update(contents).digest("hex");
    console.log(hexHash);
});

export default hashOperation;
