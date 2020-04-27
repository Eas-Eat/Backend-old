import { objectType } from '@nexus/schema'

export const Cuisine = objectType({
  name: 'Cuisine',
  definition(t): void {
    t.model.type()
    t.model.svgName()
  },
})
