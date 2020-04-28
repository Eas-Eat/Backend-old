import { objectType, extendType } from '@nexus/schema'

export const Cuisine = objectType({
  name: 'Cuisine',
  definition(t): void {
    t.model.type()
    t.model.svgName()
  },
})

export const getAllCuisines = extendType({
  type: 'Query',
  definition(t): void {
    t.list.field('getAllCuisines', {
      type: 'Cuisine',
      resolve: async (_: unknown, {}, ctx: GraphQlContext) => {
        try {
          const { prisma } = ctx

          return await prisma.cuisine.findMany()
        } catch (error) {
          console.log(error)
          throw new Error(error.code)
        }
      },
    })
  },
})
