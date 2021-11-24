import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Usuario {
    nombre: String!
  }
#  Se declara un query de tipo usuario. "Usuarios" hace referencia al resolver usuarios
# y me retorna un array de usuarios (Usuario)
  type Query{
      Usuarios:[Usuario]
  }
`;

export { typeDefs };
