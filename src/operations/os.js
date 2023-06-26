import os from "os";
import Operation from "./Operation.js";

const osOperation = new Operation("os", (arg) => {
    const list = new Set([
        "--EOL",
        "--cpus",
        "--homedir",
        "--username",
        "--architecture",
    ]);

    if (list.has(arg)) {
        switch (arg) {
            case "--EOL": {
                console.log(JSON.stringify(os.EOL));
                break;
            }
            case "--cpus": {
                const cpus = os.cpus();
                const info = cpus.map(({ model, speed }) => ({
                    Model: model,
                    "Clock rate, GHz": (speed / 1000).toFixed(3),
                }));
                console.log(`Total amount of CPUS: ${cpus.length}`);
                console.table(info);
                break;
            }
            case "--homedir": {
                const homedir = os.homedir();
                console.log(homedir);
                break;
            }
            case "--username": {
                const username = os.userInfo().username;
                console.log(username);
                break;
            }
            case "--architecture": {
                const architecture = os.arch();
                console.log(architecture);
                break;
            }
        }
    } else {
        throw new Error("Invalid input");
    }
});

export default osOperation;
