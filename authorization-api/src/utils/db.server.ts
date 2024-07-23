// define our prismaclient
import { PrismaClient } from '@prisma/client'

let db: PrismaClient

declare global {
  // `var` se usa aquí en lugar de `let` o `const`
  // para que la declaración sea global en tiempo de ejecución.
  var __db: PrismaClient | undefined
}

// create only one instance of our connection
if (!global.__db) {
  global.__db = new PrismaClient()
}

db = global.__db as PrismaClient

export { db }
