import { createTestClient } from 'apollo-server-testing'
import { server } from '../../../src/server'
import { GET_USER } from './resolvers/queries/queries'
import { CREATE_USER, UPDATE_USER, DELETE_USER } from './resolvers/mutations/mutation'

const { query, mutate } = createTestClient(server)

describe('User scenario: Register / Get / Update / Delete', () => {

    let idUser = 0;
    let passwordUser = "";

    it("Step 1 : Register", async () => {
      const response = await mutate({
        mutation: CREATE_USER,
        variables: { email: 'maxime@food.com', password:'monfrigoestvide', name: 'Maxime'}
      });

      const { id, password } = response.data?.register
      idUser = id
      passwordUser = password

      const expectedResponseData = {
          "register": {
            "id": `${idUser}`,
            "email": "maxime@food.com",
            "name": "Maxime",
            "password": `${password}`,
          }
      }
      expect(response.data).toEqual(expectedResponseData)
    })

    it("Step 2 : Get user information", async () => {
        const response = await query({
          query: GET_USER,
          variables: { id: `${idUser}`}
        })

        const expectedResponseData = {
          "getUserById": {
            "id": `${idUser}`,
            "email": "maxime@food.com",
            "name": "Maxime",
            "password": `${passwordUser}`
          }
        }
        expect(response.data).toEqual(expectedResponseData)
    })

    it("Step 3 : Update user information", async() => {

      await mutate({
        mutation: UPDATE_USER,
        variables: { id: `${idUser}`, email: "maxime&dylan@food.com", name:"MaximeCuisto"}
      })

      const response = await query({
        query: GET_USER,
        variables: { id: `${idUser}`}
      })

      const expectedResponseData = {
        "getUserById": {
          "id": `${idUser}`,
          "email": "maxime&dylan@food.com",
          "name": "MaximeCuisto",
          "password": `${passwordUser}`
        }
      }
      expect(response.data).toEqual(expectedResponseData)
    })

    it("Step 4 : Delete user", async () => {
      const response = await query({
        query: DELETE_USER,
        variables: { id: `${idUser}`}
      })

      const expectedResponseData = {
        "deleteUser": {
          "id": `${idUser}`,
          "name": "MaximeCuisto",
          "email": "maxime&dylan@food.com"
        }
      }
       expect(response.data).toEqual(expectedResponseData)
    })

    afterAll(async () => {
    await server.stop()
  })
})
