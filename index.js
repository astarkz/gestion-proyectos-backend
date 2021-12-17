//para poner esta sintaxis de import se debe modificar el package json
//para los problemas de import de express cors y dotenv en el tsconfig se
//crea el "esModuleInterop": true,
import conectarBD from "./db/db.js";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { tipos } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js";
import { validateToken } from "./utils/tokenUtils.js";

dotenv.config();

//funcion para devolver los datos del usuarios dque estan dentro del token
const getUserData = (token) => {
  const verification = validateToken(token.split(' ')[1]);
  //console.log("verifacion: ",verification)
  if (verification.data) {
    return verification.data;
  } else {
    return null;
  }
};


//Al apollo server se le deben pasar dos propiedades
//1. resolvers
//2. tipos
const server = new ApolloServer({
  typeDefs: tipos, //en una carpeta graphql se ponene los tipos y los resolvers
  resolvers: resolvers,
  context: ({ req, res }) => {
    //obtener el token del req
    // console.log(req.headers.authorization)
    const token = req.headers?.authorization ?? null; //si hay token
    if (token) {
      const userData = getUserData(token);
      if (userData) {
        return { userData };
      }
      else {
        return null;
      }
    }    
  },
});
const app = express();
app.use(express.json());
app.use(cors());

//que escuche en el puerto 4000
app.listen({ port: process.env.PORT || 5000 }, async () => {
  await conectarBD();
  await server.start(); //Prende el servidor de apollo

  server.applyMiddleware({ app }); //se agregan middelware para que use los mismo middlware de express

  console.log("servidor listo http://localhost:4000/graphql");
});
