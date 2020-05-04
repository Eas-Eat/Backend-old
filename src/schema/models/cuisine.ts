import { objectType, extendType } from '@nexus/schema'
import { GraphQlContext } from '../../../types'

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
      resolve: async (_: unknown, {}, { prisma }: GraphQlContext) => {
        try {
          return prisma.cuisine.findMany()
        } catch (error) {
          throw new Error(error.code)
        }
      },
    })
  },
})
