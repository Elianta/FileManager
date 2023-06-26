import { rm } from "fs/promises";
import Operation from "./Operation.js";

const rmOperation = new Operation("rm", async (pathToFile) => {
    await rm(pathToFile);
});

export default rmOperation;
