import {gql } from '@apollo/client'

export const ELIMINAR_PRODUCTO =  gql`
    mutation eliminarProducto($id: ID!){
        eliminarProducto(id: $id)
    }
`;