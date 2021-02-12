import {gql} from '@apollo/client'

export const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
  autenticarUsuario(input: $input) {
    token
  }
}
`;
