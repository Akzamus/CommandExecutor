import {IStreamLogger} from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger{

    private static logger: ConsoleLogger = new ConsoleLogger();

    private constructor() { }

    public end(): void {
        console.log('Done');
    }

    public error(...args: any[]): void {
        console.log(...args);
    }

    public log(...args: any[]): void {
        console.log(...args);
    }

    public static getInstance(): ConsoleLogger {
        return this.logger;
    }
}