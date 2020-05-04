import { ApolloServer } from 'apollo-server'
import {PrismaClient} from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {
      __SERVER__: ApolloServer
    }

    interface ProcessEnv {
      JWT_SECRET?: string
      MJ_APIKEY_PUBLIC?: string
      MJ_APIKEY_PRIVATE?: string
      PORT?: string
    }
  }
}

interface GraphQlContext {
  prisma: PrismaClient
  token: string
}