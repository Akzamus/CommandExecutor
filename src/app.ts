import {PromptService} from './core/prompt/prompt.service';
import {ConsoleLogger} from "./out/console-logger/console-logger";
import {FfmpegExecutor} from "./commands/ffmpeg/ffmpeg.executor";

export class App {
    public async run() {
        await new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
    }
}

new App().run();