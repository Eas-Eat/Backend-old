import { objectType, extendType, stringArg } from '@nexus/schema'

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
        userId: stringArg({ required: true })
      },
      resolve: async(_: unknown, { foodId, userId }, ctx: GraphQlContext) => {
        try {
            const food = await ctx.prisma.foodInventory.create({
              data: {
                foodId,
                userId,
              }
            })
            return food !== null
        } catch(error) {
          console.log("Error: ", error)
          throw new Error(error.code)
        }
      }
    })
  }
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
      resolve: async(_:unknown, { userId, foodId }, ctx: GraphQlContext) => {
        try {
            const food = await ctx.prisma.foodInventory.delete({
              where: {
                  userId,
                  foodId
              }
            })
            return food !== null
        } catch (error) {
          console.log(error)
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
      type:'Boolean',
      args: {
        userId: stringArg({ required: true })
      },
      resolve: async(_:unknown, { userId }, ctx: GraphQlContext) => {
        try {
            const food = await ctx.prisma.foodInventory.delete({
              where: {
                userId
              }
            })

            return food !== null
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      }
    })
  }
})
