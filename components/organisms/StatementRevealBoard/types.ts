import { RoundStage } from '@prisma/client'
import {
    GetPlayersResponseSuccess,
    GetRevealAnswerResponseSuccess,
    GetStatementForQuestionResponseSuccess,
} from 'types/apiResponses'
import { Points } from 'types/points'

export interface Props {
    statementsData: GetStatementForQuestionResponseSuccess | null
    revealData: GetRevealAnswerResponseSuccess | null
    error: string
    roundStage: RoundStage
    players: GetPlayersResponseSuccess
    selectedPlayer?: GetPlayersResponseSuccess[number]
    points: Points
}
