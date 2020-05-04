import { createTestClient } from 'apollo-server-testing'
import { server } from '../../src/server'
import { GET_ALL_CUISINES } from './queries/cuisine.queries'

const { query } = createTestClient(server)

describe('Cuisine Model', () => {
  it('Should return all the available cuisines', async () => {
    const response = await query({
      query: GET_ALL_CUISINES,
    })

    expect(response?.data?.getAllCuisines).toMatchObject([])
  })
})
