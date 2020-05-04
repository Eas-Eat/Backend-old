import { objectType, extendType, stringArg } from '@nexus/schema'
import { GraphQlContext } from '../../../types'

export const FoodInventory = objectType({
  name: 'FoodInventory',
  definition(t): void {
    t.model.foodId()
    t.model.userId()
  },
})

export const getIngredients = extendType({
  type: 'Query',
  definition(t): void {
    t.list.field('getIngredients', {
      type: 'FoodInventory',
      args: {},
      resolve: async (_: unknown, {}, { prisma, user }: GraphQlContext) => {
        if (!user) {
          throw new Error('Authentification required !')
        }

        try {
          return await prisma.foodInventory.findMany({
            where: {
              userId: user.id,
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

export const addFood = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('addFood', {
      type: 'Boolean',
      args: {
        foodId: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { foodId }, { prisma, user }: GraphQlContext) => {
        if (!user) {
          throw new Error('Authentification required !')
        }

        try {
          const newFood = await prisma.foodInventory.create({
            data: {
              foodId,
              userId: user.id,
            },
          })

          return newFood !== null
        } catch (error) {
          throw new Error(error.code)
        }
      },
    })
  },
})

export const removeFood = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('removeFood', {
      type: 'Boolean',
      args: {
        foodId: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { foodId }, { prisma, user }: GraphQlContext) => {
        if (!user) {
          throw new Error('Authentification required !')
        }

        try {
          const food = await prisma.foodInventory.delete({
            where: {
              /* eslint-disable @typescript-eslint/camelcase */
              userId_foodId: {
                userId: user.id,
                foodId,
              },
            },
          })

          return food !== null
        } catch (error) {
          throw new Error(error.code)
        }
      },
    })
  },
})

export const cleanInventory = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('cleanInventory', {
      type: 'Boolean',
      args: {},
      resolve: async (_: unknown, {}, { prisma, user }: GraphQlContext) => {
        if (!user) {
          throw new Error('Authentification required !')
        }

        try {
          await prisma.foodInventory.deleteMany({
            where: {
              userId: user.id,
            },
          })

          return true
        } catch (error) {
          throw new Error(error.code)
        }
      },
    })
  },
})
