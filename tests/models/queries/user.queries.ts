import { gql } from 'apollo-server'

export const GET_USER = gql`
  query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      email
      name
      password
    }
  }
`
