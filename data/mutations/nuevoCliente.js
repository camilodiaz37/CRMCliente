import {gql} from '@apollo/client'

export const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input: ClienteInput) {
  nuevoCliente(input: $input) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}
`;