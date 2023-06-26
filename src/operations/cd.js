import Operation from "./Operation.js";

const cdOperation = new Operation("cd", (path) => {
    process.chdir(path);
});

export default cdOperation;
