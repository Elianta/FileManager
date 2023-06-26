export default class Operation {
    constructor(name, fn) {
        this.name = name;
        this.argsQuantity = fn.length;
        this.operationFn = fn;
    }
    async start(...args) {
        if (args.length !== this.argsQuantity) {
            throw new Error("Invalid input");
        }

        try {
            await this.operationFn(...args);
        } catch (error) {
            throw new Error("Operation failed");
        }
    }
}
