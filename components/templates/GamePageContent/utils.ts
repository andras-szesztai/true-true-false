import { RoomStage, RoundStage } from '@prisma/client'

export const getAdminButtonProps = (
    roundStage: RoundStage,
    isLastRound: boolean
) => {
    if (roundStage === RoundStage.QUESTION) {
        return {
            text: 'End Questions Round',
            apiRoute: '/update-round-stage',
            postBody: { stage: RoundStage.QUESTION_END },
        }
    }
    if (roundStage === RoundStage.QUESTION_END) {
        return {
            text: 'Reveal Guesses',
            apiRoute: '/update-round-stage',
            postBody: { stage: RoundStage.GUESS_REVEAL },
        }
    }
    if (roundStage === RoundStage.GUESS_REVEAL) {
        return {
            text: 'Reveal False',
            apiRoute: '/update-round-stage',
            postBody: { stage: RoundStage.FALSE_REVEAL },
        }
    }
    if (roundStage === RoundStage.FALSE_REVEAL) {
        return {
            text: 'Calculate Scores',
            apiRoute: '/update-round-stage',
            postBody: { stage: RoundStage.SCORE_REVEAL },
        }
    }
    if (roundStage === RoundStage.SCORE_REVEAL) {
        return {
            text: 'Update Scores',
            apiRoute: '/update-round-stage',
            postBody: { stage: RoundStage.SCORING },
        }
    }
    if (roundStage === RoundStage.SCORING) {
        return isLastRound
            ? {
                  text: 'End Game',
                  apiRoute: '/update-room-stage',
                  postBody: { stage: RoomStage.END },
              }
            : { text: 'Next Round', apiRoute: '/start-round' }
    }
    return { text: 'Start First Round', apiRoute: '/start-round' }
}
