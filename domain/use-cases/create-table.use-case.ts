export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;

}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor() { }

    public execute({ base, limit = 10 }: CreateTableOptions) {
        let content = '';
        for (let i = 1; i <= limit; i++) {
            content += `${base} x ${i} = ${base * i}`

            if (i < limit) {
                content += '\n';
            }
        }

        return content;
    }

}
