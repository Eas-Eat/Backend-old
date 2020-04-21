import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import schema from './schema'
dotenv.config()

const PORT = process.env.PORT

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

server.listen(PORT)
