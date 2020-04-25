
export const GET_USER = `
  query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      email
      name
      password
    }
  }
`
