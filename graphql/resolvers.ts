//los resolver pueden ser de tipo query o de tipo mutacion
//query: es para pedir informacion, como el "GET" de REST
//mutacion: es todo lo que puede cambiar, como ""PATCH, PUT, POST, DELETE" de REST

import { resolversProyecto } from "../models/proyecto/resolvers";
import { resolversUsuario } from "../models/usuario/resolvers";
import { resolversAvance } from "../models/avance/resolvers";

export const resolvers=[resolversUsuario,resolversProyecto,resolversAvance]; 