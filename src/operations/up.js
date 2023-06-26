import { resolve } from "path";
import Operation from "./Operation.js";

const upOperation = new Operation("up", () => {
    const currentDir = process.cwd();
    const nextDir = resolve(currentDir, "..");

    process.chdir(nextDir);
});

export default upOperation;
