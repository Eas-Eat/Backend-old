import { join } from 'path'
import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'

import * as User from './models/user'
import * as Cuisine from './models/cuisine'

const generatedPath = join(process.cwd(), '__generated')

export default makeSchema({
  types: [User, Cuisine],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    typegen: join(generatedPath, 'nexus-typegen.d.ts'),
    schema: join(generatedPath, 'schema.graphql'),
  },
})
