//se debe importar el esquema y modelo de mongoose
import { Schema, model } from 'mongoose';
import { Enum_Rol, Enum_EstadoUsuario } from './enums';

interface User {
  correo: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  rol: Enum_Rol;
  estado: Enum_EstadoUsuario;
}
// esquema de mongoose
//los ID mongo los crea automaticamente
//<User> hace referencia a la interface User que esta arriba
const userSchema = new Schema<User>({
  correo: {
    type: String,
    required: true, //si es requerido
    unique: true, //si es unico
    validate: { //validacion desde el backend para el correo
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      // (email) => {
      //   if (email.includes('@') && email.includes('.')) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
      message: 'El formato del correo electrónico está malo.',
    },
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: Enum_Rol,
  },
  estado: {
    type: String,
    enum: Enum_EstadoUsuario,
    default: Enum_EstadoUsuario.PENDIENTE,
  },
});

//model es una funcion de mongoose
//esta es la forma de utilizar estos modelos con la BD
const UserModel = model('User', userSchema);

export { UserModel };