import {CommandExecutor} from "../../core/executor/command.executor";
import {ICommandExecFFmpeg, IFfmpegInput} from "./ffmpeg.types";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {IStreamLogger} from "../../core/handlers/stream-logger.interface";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/prompt/prompt.service";
import {StreamHandler} from "../../core/handlers/stream.handler";
import {FfmpegBuilder} from "./ffmpeg.builder";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {

    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    public constructor(logger: IStreamLogger) {
        super(logger);
    }
    protected build({ width, height, path, name }: IFfmpegInput): ICommandExecFFmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = new FfmpegBuilder().input(path)
            .videoSize(width, height)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Width:', 'number');
        const height = await this.promptService.input<number>('Height:', 'number');
        const path = await this.promptService.input<string>('Path to file:', 'input');
        const name = await this.promptService.input<string>('File name:', 'input');
        return { width, height, path, name };
    }

    protected spawn({ command, args, output }: ICommandExecFFmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(command, args);
    }

}