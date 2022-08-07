import { Player, Room, Statement } from '@prisma/client'
import {
    GET_PLAYERS_REQUEST_FIELDS,
    GET_PLAYER_REQUEST_FIELD,
    GET_ROOM_REQUEST_FIELDS,
    GET_STATEMENT_FOR_QUESTION_REQUEST_FIELD,
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
    Player & { statements: Statement[] },
    keyof typeof GET_PLAYERS_REQUEST_FIELDS
>[]

export type GetPlayersResponse = GetPlayersResponseSuccess | ErrorResponse

export type PostPlayerResponseSuccess = Pick<
    Player,
    keyof typeof POST_PLAYER_REQUEST_FIELD
>
export type PostPlayerResponse = PostPlayerResponseSuccess | ErrorResponse

export type GetPlayerResponseSuccess = Pick<
    Player & { statements: Statement[] },
    keyof typeof GET_PLAYER_REQUEST_FIELD
>
export type GetPlayerResponse = GetPlayerResponseSuccess | ErrorResponse

export type GetStatementForQuestionResponseSuccess = Pick<
    Statement,
    keyof typeof GET_STATEMENT_FOR_QUESTION_REQUEST_FIELD
>[]

export type GetStatementForQuestionResponse =
    | GetStatementForQuestionResponseSuccess
    | ErrorResponse

export type GetRevealAnswerResponseSuccess = {
    falseStatement: { id: number }
    guesses: { id: number; selectedAnswerId: number }[]
}

export type GetRevealAnswerResponse =
    | GetRevealAnswerResponseSuccess
    | ErrorResponse
