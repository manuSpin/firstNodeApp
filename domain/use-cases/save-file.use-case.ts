import * as fs from 'fs';


export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    destination?: string;
    filename?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() { }

    public execute({ fileContent, destination = 'outputs', filename = 'table.txt' }: SaveFileOptions): boolean {

        try {
            fs.mkdirSync(destination, { recursive: true });
            fs.writeFileSync(`${destination}/${filename}`, fileContent);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    };


}