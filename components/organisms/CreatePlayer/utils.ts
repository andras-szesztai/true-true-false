import { random } from 'lodash'

import { DEFAULT_EMOJIS } from 'constants/defaultEmojis'
import { GetPlayersResponse } from 'types/apiResponses'

export const getErrorMessage = (
    playerName: string,
    emoji: string,
    playersData?: GetPlayersResponse
) => {
    if (playersData) {
        if ('error' in playersData) {
            return playersData.error
        }
        return playersData?.some(
            (d) => d.name === playerName && d.emoji === emoji
        )
            ? 'Sorry, Name & Emoji Combination Is Already Taken'
            : ''
    }
    return ''
}

export const getRandomEmoji = () =>
    DEFAULT_EMOJIS[random(0, DEFAULT_EMOJIS.length - 1)]
