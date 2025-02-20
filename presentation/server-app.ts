import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    filename: string;
    destination: string;
}

export class ServerApp {

    public static run({ base, limit, showTable, filename, destination }: RunOptions) {
        console.log('Servidor iniciado...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile().execute({ fileContent: table, filename: filename, destination: destination });

        if (showTable) {
            console.log(table);
        }

        if (wasCreated) {
            console.log('Se ha creado el fichero');

        } else {
            console.error('No se ha podido crear el fichero');
        }
    }

}