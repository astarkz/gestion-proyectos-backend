//los resolver pueden ser de tipo query o de tipo mutacion
//query: es para pedir informacion, como el "GET" de REST
//mutacion: es todo lo que puede cambiar, como ""PATCH, PUT, POST, DELETE" de REST

import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await 
      ProjectModel.find().populate('avances').populate('inscripciones');
      return proyectos;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
  },
};

export { resolversProyecto };