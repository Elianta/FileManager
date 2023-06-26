import readline from "readline";
import os from "os";
import OPERATIONS from "./operations/index.js";

class App {
    constructor() {
        this.userName = this.getUserName();
    }

    setStartingWorkingDirectory() {
        const homeDirectory = os.homedir();
        try {
            process.chdir(homeDirectory);
        } catch (e) {
            throw new Error("Fail to change working directory");
        }
    }

    getUserName() {
        const [_nodeExecPath, _execFilePath, ...args] = process.argv;
        return (
            args.find((item) => item.includes("--username"))?.split("=")[1] ??
            "Anonymous"
        );
    }

    printWorkingDirectory() {
        const workingDir = process.cwd();
        console.log(`You are currently in ${workingDir}`);
    }

    setupReadline() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.write(`Welcome to the File Manager, ${this.userName}\n`);

        rl.on("line", async (line) => {
            if (line.trim() === ".close") {
                rl.close();
                return;
            }

            const [operation, ...args] = line.trim().split(" ");

            try {
                if (!OPERATIONS[operation]) throw new Error("Invalid input");
                await OPERATIONS[operation].start(...args);
            } catch (e) {
                console.log(e.message);
            }
            this.printWorkingDirectory();
        });

        rl.on("close", () => {
            console.log(
                `Thank you for using File Manager, ${this.userName}, goodbye!\n`
            );
        });
    }

    init() {
        this.setupReadline();
        this.setStartingWorkingDirectory();
        this.printWorkingDirectory();
    }
}

const app = new App();
app.init();
