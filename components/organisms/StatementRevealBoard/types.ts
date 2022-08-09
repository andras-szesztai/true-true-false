import { RoundStage } from '@prisma/client'
import {
    GetPlayersResponseSuccess,
    GetRevealAnswerResponse,
    GetRoomResponseSuccess,
    GetStatementForQuestionResponse,
} from 'types/apiResponses'

export interface Props
    extends Pick<GetRoomResponseSuccess, 'selectedPlayerId'> {
    statements: GetStatementForQuestionResponse | undefined
    revealAnswer: GetRevealAnswerResponse | undefined
    isLoading: boolean
    error: Error | undefined
    roundStage: RoundStage
    players: GetPlayersResponseSuccess
}
