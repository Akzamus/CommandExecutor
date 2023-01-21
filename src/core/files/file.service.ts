import {dirname, join, isAbsolute} from 'path';
import {promises} from "fs";


export class FileService {

    public getFilePath(path: string, name: string, extension: string): string {
        if(!isAbsolute(path)) {
            path = join(`${__dirname}/${path}`);
        }
        return join(`${dirname(path)}/${name}.${extension}`);
    }

    public async deleteFileIfExists(filePath: string): Promise<void> {
        if (await this.isExists(filePath)) {
            await promises.unlink(filePath);
        }
    }

    private async isExists(filePath: string): Promise<boolean> {
        try {
            await promises.stat(filePath);
            return true;
        } catch {
            return false;
        }
    }
}