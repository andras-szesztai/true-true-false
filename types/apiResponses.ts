import { Room } from '@prisma/client'

export type RoomIdResponse = Pick<Room, 'slug' | 'id'> | { error: string }
