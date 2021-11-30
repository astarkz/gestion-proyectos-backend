import { gql } from "apollo-server-express";
import { tiposEnums } from "../models/enums/tipos";
import { tiposUsuario } from "../models/usuario/tipos";
import { tiposProyecto } from "../models/proyecto/tipos";
import { tiposAvance } from "../models/avance/tipos";

const tiposGlobales = gql`
  #grapql no tiene el tipo Date por lo cual se declara como un scalar para poder usarlo luego
  scalar Date
`;

export const tipos = [tiposGlobales,tiposEnums,tiposProyecto,tiposUsuario,tiposAvance];
