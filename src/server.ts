import { ApolloServer, gql } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

interface Context {
  prisma: PrismaClient
  token: string
}

const PORT = process.env.PORT

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: (): string => 'Hello',
  },
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }): Context => {
    const token = req?.headers?.authorization || ''

    return {
      prisma: new PrismaClient(),
      token,
    }
  },
})

server.listen(PORT)
