import { objectType, extendType, stringArg } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t): void {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.password()
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
