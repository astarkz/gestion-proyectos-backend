import { connect } from "mongoose";
//const {connect} = require('mongoose'); esto hace lo mismo que el import de arriba

const conectarBD = async () => {
  return await connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("conexion a la BD exitosa");
    })
    .catch((e) => {
      console.error("Error conectando a la BD", e);
    });
};

export default conectarBD;
