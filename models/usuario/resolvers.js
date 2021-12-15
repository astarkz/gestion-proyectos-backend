//los resolver pueden ser de tipo query o de tipo mutacion
//query: es para pedir informacion, como el "GET" de REST
//mutacion: es todo lo que puede cambiar, como ""PATCH, PUT, POST, DELETE" de REST


import { UserModel } from './usuario.js';
import { InscriptionModel } from '../inscripcion/inscripcion.js';
import bcrypt from 'bcrypt';

const resolversUsuario = {
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return InscriptionModel.find({ estudiante: parent._id }).populate({
        path: 'inscripciones'});
    },
  },
  Query: {
    Usuarios: async (parent, args, context) => {
      //console.log('contexto ', context)
      //if (context.userData.rol === "ADMINISTRADOR") {
      const usuarios = await UserModel.find().populate([
        {
          path: 'proyectosLiderados'
        },
        {
          path: 'avancesCreados'
      },{
          path: 'inscripciones'
      },
      ])
        return usuarios;
      /* } else {
        return null
      }*/
      // else if (context.userData.rol === "ESTUDIANTE") {
      //   const usuarios = await UserModel.find({ rol: "ESTUDIANTE" })
      //   return usuarios;
      // }
      
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id }).populate({
          path: 'inscripciones',
          populate: {
            path: 'proyecto',
            populate: [{ path: 'lider' }, { path: 'avances' }],
          },
        })
        .populate({
          path: 'avancesCreados',
          populate: {
            path: 'proyecto',
            populate: [{ path: 'lider' }, { path: 'avances' }],
          },
        });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);

      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        //rol: args.rol,
        estado: args.estado,
      }, {new:true});

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };