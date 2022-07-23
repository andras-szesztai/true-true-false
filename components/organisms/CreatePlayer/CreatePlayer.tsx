import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useClickAway, useToggle } from 'react-use'
import useSWR from 'swr'
import { Player } from '@prisma/client'
import random from 'lodash/random'

import { Input } from 'components/molecules/Input'
import { Link, LinkSizes } from 'components/atoms/Link'
import { DEFAULT_EMOJIS } from 'constants/defaultEmojis'

import {
    ButtonContainer,
    CreatePlayerContainer,
    EmojiSelectorButton,
    EmojiSelectorContainer,
    InputContainer,
} from './styles'
import { Props } from './types'

const Picker = dynamic(
    () => {
        return import('emoji-picker-react')
    },
    { ssr: false }
)

const randomEmoji = DEFAULT_EMOJIS[random(0, DEFAULT_EMOJIS.length - 1)]

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CreatePlayer = ({ roomId }: Props) => {
    const [playerName, setPlayerName] = useState('')
    const [emoji, setEmoji] = useState<string>(randomEmoji)

    const [emojiSelectorIsOpen, setEmojiSelectorIsOpen] = useToggle(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(ref, () => {
        if (emojiSelectorIsOpen) {
            setEmojiSelectorIsOpen()
        }
    })

    const { data } = useSWR<
        { players: Pick<Player, 'name'>[] } | { error: string }
    >(`/api/room/${roomId}/players`, fetcher)

    const getErrorMessage = () => {
        if (data) {
            if ('error' in data) {
                return data.error
            }
            return data?.players.some((d) => d.name === playerName)
                ? 'Sorry, Name & Emoji Combination Is Already Taken'
                : ''
        }
    }

    return (
        <CreatePlayerContainer>
            <InputContainer>
                <ButtonContainer ref={ref}>
                    <EmojiSelectorButton onClick={setEmojiSelectorIsOpen}>
                        {emoji}
                    </EmojiSelectorButton>
                    {emojiSelectorIsOpen && (
                        <EmojiSelectorContainer>
                            <Picker
                                onEmojiClick={(_, emojiObject) =>
                                    setEmoji(emojiObject.emoji)
                                }
                            />
                        </EmojiSelectorContainer>
                    )}
                </ButtonContainer>
                <Input
                    maxLength={10}
                    placeholder="Player's Name"
                    onChange={(e) => {
                        setPlayerName(e.target.value)
                    }}
                    value={playerName}
                    error={getErrorMessage()}
                />
            </InputContainer>
            <Link
                href={`${roomId}/create-player`}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                // isDisabled={showLoading}
                // isLoading={!!roomId.length && loading}
            />
        </CreatePlayerContainer>
    )
}

export default CreatePlayer
