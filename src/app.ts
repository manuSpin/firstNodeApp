import { ServerApp } from "../presentation/server-app";
import { yarg } from "./config/plugins/yargs.plugin";

// console.log(process.argv);
// console.log(yarg);
// console.log(yarg.b);


// Función anónima autoinvocada
(async () => {
    await main();
})();


async function main() {

    const { b: base, l: limit, s: showTable, n: filename, d: destination } = yarg;
    ServerApp.run({ base, limit, showTable, filename, destination });
}