import { gql } from "@apollo/client";

export const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      nombre
      existencia
      precio
    }
  }
`;
