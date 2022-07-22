import { Room } from '@prisma/client'

export type RoomIdResponse = { id: Room['slug'] } | { error: string }
