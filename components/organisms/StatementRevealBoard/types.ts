import {
    GetRevealAnswerResponse,
    GetStatementForQuestionResponse,
} from 'types/apiResponses'

export interface Props {
    statements: GetStatementForQuestionResponse | undefined
    revealAnswer: GetRevealAnswerResponse | undefined
    isLoading: boolean
    error: Error | undefined
    // roomSlug: GetPlayerResponseSuccess['slug']
    // playerSlug: GetRoomResponseSuccess['slug']
    // isPlayerReady: boolean
    // isAllReady: boolean
}

export enum STAGES {
    IDLE = 'IDLE',
    REVEAL_VOTES = 'REVEAL_VOTES',
    REVEAL_FALSE = 'REVEAL_FALSE',
}
