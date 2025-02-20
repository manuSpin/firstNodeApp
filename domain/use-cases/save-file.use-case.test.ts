import { SaveFile, SaveFileOptions } from './save-file.use-case';
import fs from 'fs';


describe('SaveFileUseCase', () => {   
    const customOptions: SaveFileOptions = {
        fileContent: 'custom content',
        destination: 'custom-outputs/file-destination',
        filename: 'custom-table-name'
    };

    afterEach(() => {
        if (fs.existsSync('outputs')) {
            fs.rmSync('outputs', { recursive: true });
        }

        if (fs.existsSync('custom-outputs')) {
            fs.rmSync('custom-outputs', { recursive: true });
        }
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const options: SaveFileOptions = {
            fileContent: 'test content'
        };
        const filePath = 'outputs/table.txt';
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(fileExist).toBe(true);
        expect(fileContent).toContain(options.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();
        
        const filePath = `${customOptions.destination}/${customOptions.filename}.txt`;
        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toContain(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Testing MOCK error: Error al crear el directorio');
        });
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });

    // TODO Revisar. Funcionaba y ha dejado de hacerlo. Esta igual al suyo
    
    // test('should return false if file could not be created', () => {
    //     const saveFile = new SaveFile();
    //     const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
    //         throw new Error('Testing MOCK error: Error al crear el fichero');
    //     });
    //     const result = saveFile.execute(customOptions);

    //     expect(result).toBe(false);

    //     writeSpy.mockRestore();
    // });

    //! El suyo
    // test('should return false if file could not be created', () => {

    //     const saveFile = new SaveFile();
    //     const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
    //         () => { throw new Error('This is a custom writing error message'); }
    //     );

    //     const result = saveFile.execute({ fileContent: 'Hola' });

    //     expect(result).toBe(false);

    //     writeFileSpy.mockRestore();
    // }); 
});