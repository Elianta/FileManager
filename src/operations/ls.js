import { readdir } from "fs/promises";
import Operation from "./Operation.js";

const lsOperation = new Operation("ls", async () => {
    const currentDir = process.cwd();
    const dirents = await readdir(currentDir, { withFileTypes: true });
    const files = dirents.reduce((acc, dirent) => {
        if (dirent.isDirectory() || dirent.isFile()) {
            acc.push({
                Name: dirent.name,
                Type: dirent.isDirectory() ? "directory" : "file",
            });
        }
        return acc;
    }, []);
    const sortedFiles = files.sort((a, b) => {
        if (a.Type === "directory" && b.Type === "file") {
            return -1;
        } else if (a.Type === "file" && b.Type === "directory") {
            return 1;
        } else {
            return a.Name.localeCompare(b.Name);
        }
    });
    console.table(sortedFiles);
});

export default lsOperation;
