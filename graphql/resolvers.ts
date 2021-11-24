//los resolver pueden ser de tipo query o de tipo mutacion
//query: es para pedir informacion, como el "GET" de REST
//mutacion: es todo lo que puede cambiar, como ""PATCH, PUT, POST, DELETE" de REST

const resolvers = {
  Query: {
    Usuarios: [
      {
        nombre: "juan",
      },
      {
        nombre: "Andres",
      },
      {
        nombre: "Daniel",
      },
    ],
  },
};

export {resolvers};