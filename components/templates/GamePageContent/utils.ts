import { RoomStage, RoundStage } from '@prisma/client'
import { min, pullAt, uniq } from 'lodash'

export const getAdminButtonProps = (
    roundStage: RoundStage,
    isLastRound: boolean,
    updateScoresSuccess: boolean,
    updateScoresError: boolean
) => {
    if (roundStage === RoundStage.QUESTION) {
        return {
            text: 'End Questions Round',
            apiRoute: `/update-round-stage/${RoundStage.QUESTION_END}`,
        }
    }
    if (roundStage === RoundStage.QUESTION_END) {
        return {
            text: 'Reveal Guesses',
            apiRoute: `/update-round-stage/${RoundStage.GUESS_REVEAL}`,
        }
    }
    if (roundStage === RoundStage.GUESS_REVEAL) {
        return {
            text: 'Reveal False',
            apiRoute: `/update-round-stage/${RoundStage.FALSE_REVEAL}`,
        }
    }
    if (roundStage === RoundStage.FALSE_REVEAL) {
        return {
            text: 'Calculate Scores',
            apiRoute: `/update-round-stage/${RoundStage.SCORE_REVEAL}`,
        }
    }
    if (roundStage === RoundStage.SCORE_REVEAL || updateScoresError) {
        return {
            text: 'Update Scores',
            apiRoute: `/update-round-stage/${RoundStage.SCORING}`,
        }
    }
    if (roundStage === RoundStage.SCORING && updateScoresSuccess) {
        return isLastRound
            ? {
                  text: 'End Game',
                  apiRoute: `/update-room-stage/${RoomStage.END}`,
              }
            : { text: 'Next Round', apiRoute: '/start-round' }
    }
    if (roundStage === RoundStage.IDLE) {
        return { text: 'Start First Round', apiRoute: '/start-round' }
    }
    return { text: '' }
}

const getMinIdCount = (fullIdArray: number[], uniqIdArray: number[]) =>
    min(
        uniqIdArray.map((uId) => fullIdArray.filter((id) => uId === id).length)
    ) || 1

export const getSelectedPlayerScore = (selectedStatementIds: number[]) => {
    const uniqSelectedIds = uniq(selectedStatementIds)
    if (uniqSelectedIds.length === 1) return 0
    const minIdCount = getMinIdCount(selectedStatementIds, uniqSelectedIds)
    if (uniqSelectedIds.length === 2) {
        return minIdCount * 2
    }
    if (uniqSelectedIds.length === 3) {
        const remainingSelectedStatementIds = [...selectedStatementIds]
        Array.from(Array(minIdCount)).forEach(() => {
            const toPull = uniqSelectedIds.map((id) =>
                selectedStatementIds.findIndex((d) => d === id)
            )
            pullAt(remainingSelectedStatementIds, toPull)
        })
        const remainingUniqSelectedIds = uniq(remainingSelectedStatementIds)
        if (
            !remainingUniqSelectedIds.length ||
            remainingUniqSelectedIds.length === 1
        )
            return minIdCount * 3
        if (remainingUniqSelectedIds.length === 2) {
            const remainingMinIdCount = getMinIdCount(
                remainingUniqSelectedIds,
                remainingSelectedStatementIds
            )
            return minIdCount * 3 + remainingMinIdCount * 2
        }
    }
    return 0
}
