import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
    GetStatementForQuestionResponse,
} from 'types/apiResponses'

export interface Props {
    statements: GetStatementForQuestionResponse | undefined
    isLoading: boolean
    error: Error | undefined
    roomSlug: GetPlayerResponseSuccess['slug']
    playerSlug: GetRoomResponseSuccess['slug']
    isPlayerReady: boolean
    isAllReady: boolean
    isCurrentPlayerStatements: boolean
    selectedPlayer?: GetPlayersResponseSuccess[number]
}
