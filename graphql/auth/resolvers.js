import { UserModel } from '../../models/usuario/usuario.js';
import bcrypt from 'bcrypt';
import { generateToken, validateToken } from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
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
      console.log('usuario creado', usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          rol: usuarioCreado.rol,
        }),
      };
    },

    login: async (parent, args) => {
      const usuarioEcontrado = await UserModel.findOne({ correo: args.correo });
      const comparacion = await bcrypt.compare(args.password, usuarioEcontrado.password)    
    
      if (comparacion) {
        return {
            token: generateToken({
                _id: usuarioEcontrado._id,
                nombre: usuarioEcontrado.nombre,
                apellido: usuarioEcontrado.apellido,
                identificacion: usuarioEcontrado.identificacion,
                correo: usuarioEcontrado.correo,
                rol: usuarioEcontrado.rol,
            }),
          };
        }     
    },

    refreshToken: async (parent, args, context) => {
      console.log('contexto: ', context);
      const userData = context.userData
      if (!userData) {
        return{ error: "token no valido"}
      } else {
        return {
            token: generateToken({
              _id: userData._id,
              nombre: userData.nombre,
              apellido: userData.apellido,
              identificacion: userData.identificacion,
              correo: userData.correo,
              rol: userData.rol,
            }),
          };
      }
      // validar que el contexto tenga info del usuario. 
      //Si refrescar el token
      //si no devolver null para que en el front redirija al login
    },
  },
};

export { resolversAutenticacion };