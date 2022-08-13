import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
    GetStatementForQuestionResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    statements: GetStatementForQuestionResponseSuccess | null
    error: string
    roomSlug: GetPlayerResponseSuccess['slug']
    playerSlug: GetRoomResponseSuccess['slug']
    isPlayerReady: boolean
    isAllReady: boolean
    isCurrentPlayerSelected: boolean
    selectedPlayer?: GetPlayersResponseSuccess[number]
}
