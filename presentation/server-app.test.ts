import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { RunOptions, ServerApp } from './server-app';

describe('Server App', () => {
    const options: RunOptions = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        filename: 'test-file'
    };

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    });

    // test('should run ServerApp with options', () => {
    //     const logSpy = jest.spyOn(console, 'log');
    //     const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    //     const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


    //     ServerApp.run(options);

    //     expect(logSpy).toHaveBeenCalledTimes(2);
    //     expect(logSpy).toHaveBeenCalledWith('Servidor iniciado...');
    //     expect(logSpy).toHaveBeenLastCalledWith('Se ha creado el fichero');
    //     expect(createTableSpy).toHaveBeenCalledTimes(1);
    //     expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    //     expect(saveFileSpy).toHaveBeenCalledTimes(1);
    //     expect(saveFileSpy).toHaveBeenCalledWith({ fileContent: expect.any(String), destination: options.destination, filename: options.filename });
    // });

    test('should run with custom values mocked', () => {
        const createMock = jest.fn().mockReturnValue('2 x 1 = 2');
        const saveMock = jest.fn().mockReturnValue(true);
        const logMock = jest.fn();
        const logErrorMock = jest.fn();

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveMock;
        console.log = logMock;
        console.error = logErrorMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Servidor iniciado...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveMock).toHaveBeenCalledWith({ fileContent: '2 x 1 = 2', destination: options.destination, filename: options.filename });
        expect(logMock).toHaveBeenLastCalledWith('Se ha creado el fichero');
        expect(logErrorMock).not.toHaveBeenCalled(); 
    });
});
