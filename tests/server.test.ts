import { createTestClient } from 'apollo-server-testing'
import { server } from '../src/server'

const { query } = createTestClient(server)
describe('Apollo Server', () => {
  it('Should return { data: { hello: "Hello" } } when using GraphQL query: { hello }', async () => {
    const response = await query({
      query: '{ hello }',
    })

    expect(response.data).toEqual({
      hello: 'Hello',
    })
  })

  afterAll(async () => {
    await server.stop()
  })
})
