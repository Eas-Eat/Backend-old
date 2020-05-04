import { objectType, extendType, stringArg } from '@nexus/schema'
import {GraphQlContext} from '../../../types'

export const FoodInventory = objectType({
  name: 'FoodInventory',
  definition(t): void {
    t.model.foodId()
    t.model.userId()
  },
})

export const addFood = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('addFood', {
      type: 'Boolean',
      args: {
        foodId: stringArg({ required: true }),
        userId: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { foodId, userId  }, { prisma }: GraphQlContext) => {
        try {
          const newFood = await prisma.foodInventory.create({
            data: {
              foodId,
              userId,
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
        userId: stringArg({ required: true }),
        foodId: stringArg({ required: true })
      },
      resolve: async(_: unknown, { userId, foodId }, { prisma }: GraphQlContext) => {
        try {
          const food = await prisma.foodInventory.delete({
            where: {
              'userId_foodId': {
                userId,
                foodId,
              }
            }
          })

          return food !== null
        } catch (error) {
          throw new Error(error.code)
        }
      }
    })
  }
})

export const cleanInventory = extendType({
  type: 'Mutation',
  definition(t): void {
    t.field('cleanInventory', {
      type: 'Boolean',
      args: {
        userId: stringArg({ required: true }),
      },
      resolve: async (_: unknown, { userId }, { prisma }: GraphQlContext) => {
        try {
          await prisma.foodInventory.deleteMany({
            where: {
              userId,
            }
          })

          return true
        } catch (error) {
          throw new Error(error.code)
        }
      },
    })
  },
})
