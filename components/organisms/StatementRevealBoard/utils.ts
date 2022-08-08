import { min, pullAt, uniq } from 'lodash'

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
