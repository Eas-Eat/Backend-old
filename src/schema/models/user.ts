import { objectType, extendType, stringArg } from '@nexus/schema'
import { createPassword, verifyPassword } from '../../utils/password'
import jwt from 'jsonwebtoken'

export const User = objectType({
  name: 'User',
  definition(t): void {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.password()
  },
})

export const login = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('login', {
      type: 'String',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { email, password }, ctx: GraphQlContext) => {
        try {
          const user = await ctx.prisma.user.findOne({
            where: { email },
          })

          if (!user) {
            throw new Error('Invalid email or password')
          }

          const isMatchPassword = verifyPassword(password, user.password)
          if (!isMatchPassword) {
            throw new Error('Invalid email or password')
          }

          return jwt.sign(user, process.env.JWT_SECRET as string)
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      },
    })
  },
})

export const createUser = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('register', {
      type: 'User',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { email, password, name }, ctx: GraphQlContext) => {
        try {
          password = await createPassword(password)

          return ctx.prisma.user.create({
            data: {
              email,
              password,
              name,
            },
          })
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      },
    })
  },
})

export const deleteUser = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('deleteUser', {
      type: 'User',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { id }, ctx: GraphQlContext) => {
        try {
          return ctx.prisma.user.delete({
            where: { id },
          })
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      },
    })
  },
})

export const updateUser = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('updateUser', {
      type: 'User',
      args: {
        id: stringArg({ required: true }),
        name: stringArg({ required: false }),
        email: stringArg({ required: false }),
      },
      resolve: async (_: unknown, { id, email, name }, ctx: GraphQlContext) => {
        try {
          return ctx.prisma.user.update({
            data: {
              email: email,
              name: name,
            },
            where: { id },
          })
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      },
    })
  },
})

export const getUserById = extendType({
  type: 'Query',
  definition(t): void {
    t.field('getUserById', {
      type: 'User',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { id }, ctx: GraphQlContext) => {
        try {
          return ctx.prisma.user.findOne({
            where: { id },
          })
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      },
    })
  },
})
