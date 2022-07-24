import { Player, Room } from '@prisma/client'

export type GetRoomResponse = Pick<Room, 'slug' | 'id'> | { error: string }
export type PostRoomResponse = Pick<Room, 'slug'> | { error: string }

export type CreatePlayerResponse =
    | Pick<Player, 'id' | 'slug'>
    | { error: string }
