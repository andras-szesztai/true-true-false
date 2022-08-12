import { RoundStage } from '@prisma/client'
import {
    GetPlayersResponseSuccess,
    GetRevealAnswerResponse,
    GetStatementForQuestionResponse,
} from 'types/apiResponses'

export interface Props {
    statements: GetStatementForQuestionResponse | undefined
    revealAnswer: GetRevealAnswerResponse | undefined
    isLoading: boolean
    error: Error | undefined
    roundStage: RoundStage
    players: GetPlayersResponseSuccess
    selectedPlayer?: GetPlayersResponseSuccess[number]
}
