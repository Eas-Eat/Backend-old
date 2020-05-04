import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { GraphQlContext, User } from '../types'
import schema from './schema'

const isUser = (value: object): value is User => {
  const { id, email, name } = value as User

  return email !== undefined && name !== undefined && id !== undefined
}

export const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }): GraphQlContext => {
    const token = req?.headers?.authorization || ''
    let user = null

    if (token) {
      try {
        const jwtSecret = process.env.JWT_SECRET as string
        const obj = jwt.verify(token, jwtSecret)

        if (typeof obj === 'object' && isUser(obj)) {
          user = obj
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      prisma: new PrismaClient(),
      user,
    }
  },
})
