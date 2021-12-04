import mongoose from "mongoose";
//const {connect} = require('mongoose'); esto hace lo mismo que el import de arriba

const conectarBD = async () => {
  return await mongoose 
  .connect(process.env.DATABASE_URL)
  .then(() => {
      console.log("Conexion a la BD exitosa");
    })
    .catch((e) => {
      console.error("Error conectando a la BD", e);
    });
};

export default conectarBD;
