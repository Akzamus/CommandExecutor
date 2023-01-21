import {ICommandExec} from "../../core/executor/command.types";

export type IFfmpegInput = {
    width: number;
    height: number;
    path: string;
    name: string;
}

export interface ICommandExecFFmpeg extends ICommandExec {
    output: string
}