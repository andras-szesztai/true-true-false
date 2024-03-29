import { PrismaClient } from '@prisma/client'

let prismaClient = new PrismaClient()

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient()
} else {
    // @ts-ignore
    if (!global.prisma) {
        // @ts-ignore
        global.prisma = new PrismaClient()
    }
    // @ts-ignore
    prismaClient = global.prisma
}

export const prisma = prismaClient
