import { createTestClient } from 'apollo-server-testing'
import { server } from '../../src/server'
import { CREATE_USER, UPDATE_USER, DELETE_USER } from './mutations/user.mutation'
import { GET_USER } from './queries/user.queries'

const { query, mutate } = createTestClient(server)

describe('User Model', () => {
  let userId = ''

  beforeAll(async () => {
    await server.listen(3000)
  })

  afterAll(async () => {
    await server.stop()
  })

  it('Should create an User', async () => {
    const response = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: 'maxime@food.com',
        password: 'monfrigoestvide',
        name: 'Maxime',
      },
    })

    userId = response?.data?.register.id

    expect(response?.data?.register).toMatchObject({
      email: 'maxime@food.com',
      name: 'Maxime',
    })
  })

  it('Should retrieve User informations', async () => {
    const response = await query({
      query: GET_USER,
      variables: { id: `${userId}` },
    })

    expect(response?.data?.getUserById).toMatchObject({
      email: 'maxime@food.com',
      name: 'Maxime',
    })
  })

  it('Should update User informations', async () => {
    await mutate({
      mutation: UPDATE_USER,
      variables: {
        id: `${userId}`,
        email: 'maxime&dylan@food.com',
        name: 'MaximeCuisto',
      },
    })

    const response = await query({
      query: GET_USER,
      variables: { id: `${userId}` },
    })

    expect(response?.data?.getUserById).toMatchObject({
      email: 'maxime&dylan@food.com',
      name: 'MaximeCuisto',
    })
  })

  it('Should delete an User', async () => {
    const response = await query({
      query: DELETE_USER,
      variables: { id: `${userId}` },
    })

    expect(response?.data?.deleteUser).toMatchObject({
      name: 'MaximeCuisto',
      email: 'maxime&dylan@food.com',
    })
  })
})
