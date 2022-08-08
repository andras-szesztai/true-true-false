import { getSelectedPlayerScore } from './utils'

describe('getSelectedPlayerScore', () => {
    it('returns 0 with no guess spreading', () => {
        const result = getSelectedPlayerScore([3, 3, 3])
        expect(result).toBe(0)
    })

    it('returns 2 point for each 2 statements that were guessed by one player each', () => {
        const resultOne = getSelectedPlayerScore([3, 2, 3])
        expect(resultOne).toBe(2)
        const resultTwo = getSelectedPlayerScore([3, 2, 3, 2, 3])
        expect(resultTwo).toBe(4)
        const resultThree = getSelectedPlayerScore([3, 2, 3, 2])
        expect(resultThree).toBe(4)
        const resultFourth = getSelectedPlayerScore([3, 2])
        expect(resultFourth).toBe(2)
    })

    it('returns 3 points for each 3 statements that were guessed by one player each', () => {
        const resultOne = getSelectedPlayerScore([1, 2, 3, 2])
        expect(resultOne).toBe(3)
        const resultTwo = getSelectedPlayerScore([1, 2, 3, 2, 3, 2, 2])
        expect(resultTwo).toBe(5)
        const resultThree = getSelectedPlayerScore([1, 2, 3, 1, 2, 3, 1, 2, 1])
        expect(resultThree).toBe(8)
        const resultFour = getSelectedPlayerScore([1, 2, 3])
        expect(resultFour).toBe(3)
    })
})
