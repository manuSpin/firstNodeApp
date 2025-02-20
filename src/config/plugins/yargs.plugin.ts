import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
.option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Número para la tabla de multiplicación'
})
.option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Cuantos resultados quieres de la tabla de multiplicar'
})
.option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Mostrar por consola la tabla de multiplicar'
})
.option('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table.txt',
    describe: 'Nombre del fichero'
})
.option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Destgino del fichero'
})
.check((argv, options) => {

    if (argv.b < 0) {
        throw new Error('Error: La base debe ser un número positivo');
    }
    if (argv.l < 0) {
        throw new Error('Error: El límite debe ser un número positivo');
    }
    return true;
})
.parseSync();