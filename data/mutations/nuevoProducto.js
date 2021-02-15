import {gql} from '@apollo/client'

export const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input:ProductoInput){
        nuevoProducto(input:$input){
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;