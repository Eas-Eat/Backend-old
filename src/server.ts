import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import schema from './schema'

export const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }): GraphQlContext => {
    const token = req?.headers?.authorization || ''

    return {
      prisma: new PrismaClient(),
      token,
    }
  },
})
