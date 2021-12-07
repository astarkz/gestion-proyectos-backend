//los resolver pueden ser de tipo query o de tipo mutacion
//query: es para pedir informacion, como el "GET" de REST
//mutacion: es todo lo que puede cambiar, como ""PATCH, PUT, POST, DELETE" de REST

import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversUsuario } from "../models/usuario/resolvers.js";
import { resolversAvance } from "../models/avance/resolvers.js";
import { resolverInscripciones } from "../models/inscripcion/resolvers.js";
import {resolversAutenticacion} from './auth/resolvers.js';


export const resolvers=[
    resolversUsuario,
    resolversProyecto,
    resolversAvance,
    resolverInscripciones,
    resolversAutenticacion]; 