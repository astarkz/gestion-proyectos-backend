//para poner esta sintaxis de import se debe modificar el package json
//para los problemas de import de express cors y dotenv en el tsconfig se
//crea el "esModuleInterop": true,
import conectarBD from "./db/db";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { typeDefs } from "./graphql/types";
import { resolvers } from "./graphql/resolvers";

dotenv.config();

//Al apollo server se le deben pasar dos propiedades
//1. resolvers
//2. tipos
const server = new ApolloServer({
  typeDefs: typeDefs, //en una carpeta graphql se ponene los tipos y los resolvers
  resolvers: resolvers,
});
const app = express();
app.use(express.json());
app.use(cors());

//que escuche en el puerto 4000
app.listen({ port: process.env.PORT || 5000 }, async () => {
  await conectarBD();
  await server.start(); //Prende el servidor de apollo

  server.applyMiddleware({ app }); //se agregan middelware para que use los mismo middlware de express

  console.log("servidor listo");
});
