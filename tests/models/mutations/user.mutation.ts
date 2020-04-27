import { gql } from 'apollo-server'

export const CREATE_USER = gql`
  mutation register($email: String!, $name: String!, $password: String!) {
    register(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $email: String!, $name: String!) {
    updateUser(id: $id, email: $email, name: $name) {
      email
      name
    }
  }
`

export const DELETE_USER = `
  mutation deleteUser ($id: String!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`
