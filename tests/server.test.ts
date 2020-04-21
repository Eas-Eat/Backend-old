import { createTestClient } from 'apollo-server-testing'
import { server } from '../src/server'

const { query } = createTestClient(server)
describe('Apollo Server', () => {
  afterAll(async () => {
    await server.stop()
  })
})
