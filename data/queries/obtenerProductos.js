import {gql} from '@apollo/client'

export const OBTENER_PRODUCTOS =gql`
    query obtenerProductos{
        obtenerProductos{
            id
            nombre
            precio
            existencia
        }
    }
`;