//los resolver pueden ser de tipo query o de tipo mutacion
//query: es para pedir informacion, como el "GET" de REST
//mutacion: es todo lo que puede cambiar, como ""PATCH, PUT, POST, DELETE" de REST

import { ProjectModel } from '../models/project';
import { UserModel } from '../models/user';

const resolvers = {
  Query: {

    //Para traer un usuario y un arreglo de usuarios -------------
    Usuarios: async (parent, args) => {
      const usuarios = await UserModel.find();
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
    //Para traer los proyectos -------------
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find().populate('lider');
      return proyectos;
    },
  },
  Mutation: {

    //Creacion de usuario se utiliza el UserModel de los schemas de mongoose -------------
    //los argumentos es para tomar los datos que introduce el usuario en apollo server
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
      });
      // este condicional es para que cuando se envie el estado, se actualice
      //y no salga el que esta por defecto el cual esta declarado como "PENDIENTE"
      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }
      return usuarioCreado;
    },

    //Editar usuario se busca por ID ------------------
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        estado: args.estado,
      });

      return usuarioEditado;
    },

    //Eliminar usuario -----------------------------------
    eliminarUsuario: async (parent, args) => {

      //Elimina por ID --------------
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
        //Elimina por correo --------------
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: [{ descripcion: 'Este es el objetivo general', tipo: 'GENERAL' }],
      });
      return proyectoCreado;
    },
  },
};
export {resolvers};