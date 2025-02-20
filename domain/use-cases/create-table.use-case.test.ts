import { CreateTable, CreateTableOptions } from './create-table.use-case';

describe('CreateTableUSeCase', () => {
    test('should create table with default values', () => {
        const createTable = new CreateTable();
        const base = 2;
        
        const table = createTable.execute({base: base});
        const rows = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
        expect(rows.length).toBe(10);
    });

    test('should create table with custom values', () => {
        const createTable = new CreateTable();
        const options: CreateTableOptions = {
            base: 3,
            limit: 20
        };

        const table = createTable.execute(options);
        const rows = table.split('\n');

        expect(table).toContain('3 x 1 = 3');
        expect(table).toContain('3 x 10 = 30');
        expect(table).toContain('3 x 20 = 60');
        expect(rows.length).toBe(options.limit);
    });
});