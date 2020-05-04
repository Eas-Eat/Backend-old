import { server } from '../src/server'

export default async () => {
  global.__SERVER__ = server

  await global.__SERVER__.listen()
}
