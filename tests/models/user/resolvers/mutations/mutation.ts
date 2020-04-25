
export const CREATE_USER = `
  mutation register($email: String!, $name: String!, $password: String!) {
    register(email: $email, password: $password, name: $name) {
        id
        email
        name
        password
    }
  }
`
export const UPDATE_USER = `
  mutation updateUser($id: String!, $email: String!, $name: String!){
    updateUser(id: $id, email: $email, name:$name){
      email,
      name
    }
  }
`

export const DELETE_USER = `
  mutation deleteUser ($id: String!){
      deleteUser(id: $id){
      id
      name
      email
    }
  }
`
