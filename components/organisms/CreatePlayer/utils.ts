import { DEFAULT_EMOJIS } from 'constants/defaultEmojis'
import { random } from 'lodash'
import { PlayersDataResponse } from './types'

export const getErrorMessage = (
    playerName: string,
    emoji: string,
    playersData?: PlayersDataResponse
) => {
    if (playersData) {
        if ('error' in playersData) {
            return playersData.error
        }
        return playersData?.players.some(
            (d) => d.name === playerName && d.emoji === emoji
        )
            ? 'Sorry, Name & Emoji Combination Is Already Taken'
            : ''
    }
    return ''
}

export const playersFetcher = (url: string) =>
    fetch(url).then((res) => res.json())

export const getRandomEmoji = () =>
    DEFAULT_EMOJIS[random(0, DEFAULT_EMOJIS.length - 1)]
