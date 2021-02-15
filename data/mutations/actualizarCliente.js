import {gql} from '@apollo/client'

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($id: ID!, $input: ClienteInput){
        actualizarCliente(id:$id, input: $input){
            nombre
            email
        }
    }
`;