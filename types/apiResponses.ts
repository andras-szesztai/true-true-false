import { Player, Room } from '@prisma/client'
import {
    GET_PLAYERS_REQUEST_FIELDS,
    GET_PLAYER_REQUEST_FIELD,
    GET_ROOM_REQUEST_FIELDS,
    POST_PLAYER_REQUEST_FIELD,
    POST_ROOM_REQUEST_FIELDS,
} from 'constants/requests'

type ErrorResponse = { error: string }

export type PostRoomResponseSuccess = Pick<
    Room,
    keyof typeof POST_ROOM_REQUEST_FIELDS
>
export type PostRoomResponse = PostRoomResponseSuccess | ErrorResponse

export type GetRoomResponseSuccess = Pick<
    Room,
    keyof typeof GET_ROOM_REQUEST_FIELDS
>
export type GetRoomResponse = GetRoomResponseSuccess | ErrorResponse

export type GetPlayersResponseSuccess = Pick<
    Player,
    keyof typeof GET_PLAYERS_REQUEST_FIELDS
>[]
export type GetPlayersResponse = GetPlayersResponseSuccess | ErrorResponse

export type PostPlayerResponseSuccess = Pick<
    Player,
    keyof typeof POST_PLAYER_REQUEST_FIELD
>
export type PostPlayerResponse = PostPlayerResponseSuccess | ErrorResponse

export type GetPlayerResponseSuccess = Pick<
    Player,
    keyof typeof GET_PLAYER_REQUEST_FIELD
>
export type GetPlayerResponse = GetPlayerResponseSuccess | ErrorResponse
