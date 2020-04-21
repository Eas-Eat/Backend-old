declare namespace NodeJS {
  export interface ProcessEnv {
    MJ_APIKEY_PUBLIC?: string
    MJ_APIKEY_PRIVATE?: string
    PORT?: string
  }
}

interface GraphQlContext {
  prisma: PrismaClient
  token: string
}
