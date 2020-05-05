import { objectType, extendType, stringArg } from '@nexus/schema'
import { GraphQlContext } from '../../../types'
import { createPassword, verifyPassword } from '../../utils/password'
import { sendEmailWithTemplate } from '../../libs/Mailjet'
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
      resolve: async (_: unknown, { email, password }, { prisma }: GraphQlContext) => {
        let user

        try {
          user = await prisma.user.findOne({
            where: { email },
          })
        } catch (error) {
          throw new Error(error.code)
        }

        if (!user) {
          throw new Error('Invalid email or password')
        }

        const isMatchPassword = await verifyPassword(password, user.password)
        if (!isMatchPassword) {
          throw new Error('Invalid email or password')
        }

        return jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET as string,
        )
      },
    })
  },
})

export const register = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('register', {
      type: 'User',
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { email, password, name }, { prisma }: GraphQlContext) => {
        try {
          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password: await createPassword(password),
            },
          })

          await sendEmailWithTemplate([{ Email: email }], 1394707)

          return newUser
        } catch (error) {
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
      args: {},
      resolve: async (_: unknown, {}, { prisma, user }: GraphQlContext) => {
        if (!user) {
          throw new Error('Authentification required !')
        }

        try {
          return prisma.user.delete({
            where: { email: user.email },
          })
        } catch (error) {
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
        name: stringArg({ required: false }),
        email: stringArg({ required: false }),
      },
      resolve: async (_: unknown, { email, name }, { prisma, user }: GraphQlContext) => {
        if (!user) {
          throw new Error('Authentification required !')
        }

        try {
          return prisma.user.update({
            data: {
              email: email,
              name: name,
            },
            where: { email: user.email },
          })
        } catch (error) {
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
      resolve: async (...args) => {
        const [, { id }, { prisma }] = args

        try {
          return prisma.user.findOne({
            where: { id },
          })
        } catch (error) {
          throw new Error(error.code)
        }
      },
    })
  },
})
