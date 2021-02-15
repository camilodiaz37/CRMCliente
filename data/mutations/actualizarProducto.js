import { gql } from "@apollo/client";

export const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput!) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      precio
      existencia
    }
  }
`;
