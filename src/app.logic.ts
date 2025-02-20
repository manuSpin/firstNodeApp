import * as fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';


const numero = yarg.b;
let content = '';
const limit = yarg.l;

// const {b:base, l:limit, s:show} = yarg;

// Añadimos la cabecera
content += `===================
    Tabla del ${numero}     
===================\n\n`

// Creamos las líneas de la tabla
for (let i = 1; i <= limit; i++) {
    content += `${numero} x ${i} = ${numero * i}\n`
}

// Imprimimos en consola la tabla
if (yarg.s) {
    console.log(content);
}

// Creamos el fichero
fs.mkdirSync('outputs', {recursive:true});
fs.writeFileSync(`outputs/tabla-${numero}.txt`, content);

console.log('El fichero se ha creado');