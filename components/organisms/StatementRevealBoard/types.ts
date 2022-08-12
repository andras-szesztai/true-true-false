import { RoundStage } from '@prisma/client'
import {
    GetPlayersResponseSuccess,
    GetRevealAnswerResponse,
    GetStatementForQuestionResponse,
} from 'types/apiResponses'
import { Points } from 'types/points'

export interface Props {
    statements: GetStatementForQuestionResponse | undefined
    revealAnswer: GetRevealAnswerResponse | undefined
    isLoading: boolean
    error: Error | undefined
    roundStage: RoundStage
    players: GetPlayersResponseSuccess
    selectedPlayer?: GetPlayersResponseSuccess[number]
    points: Points
}
