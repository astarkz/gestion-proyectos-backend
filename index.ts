//para poner esta sintaxis de import se debe modificar el package json
import conectarBD from "./db/db";

const main = async()=>{
await conectarBD();
};

main();

