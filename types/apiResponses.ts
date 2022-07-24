import { Player, Room } from '@prisma/client'

export type PostRoomResponseSuccess = Pick<Room, 'slug'>
export type PostRoomResponse = PostRoomResponseSuccess | { error: string }

export type GetRoomResponseSuccess = Pick<Room, 'slug' | 'id'>
export type GetRoomResponse = GetRoomResponseSuccess | { error: string }

export type PostPlayerResponseSuccess = Pick<Player, 'slug' | 'id'>
export type PostPlayerResponse = PostPlayerResponseSuccess | { error: string }

export type GetPlayerResponseSuccess = Pick<Player, 'slug' | 'id'>
export type GetPlayerResponse = GetPlayerResponseSuccess | { error: string }
