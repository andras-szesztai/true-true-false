import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useClickAway, useLocalStorage, useToggle } from 'react-use'
import useSWR from 'swr'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { Input } from 'components/molecules/Input'

import {
    ButtonContainer,
    CreatePlayerContainer,
    EmojiSelectorButton,
    EmojiSelectorContainer,
    InputContainer,
} from './styles'
import { PlayersDataResponse, Props } from './types'
import { getErrorMessage, getRandomEmoji, playersFetcher } from './utils'

const Picker = dynamic(
    () => {
        return import('emoji-picker-react')
    },
    { ssr: false }
)

const CreatePlayer = ({ roomId }: Props) => {
    const [storedName, setStoredName] = useLocalStorage('name', '')
    const [storedEmoji, setStoredEmoji] = useLocalStorage('emoji', '')
    const [name, setName] = useState(storedName || '')
    const [emoji, setEmoji] = useState<string>(storedEmoji || getRandomEmoji())

    const [emojiSelectorIsOpen, setEmojiSelectorIsOpen] = useToggle(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(ref, () => {
        if (emojiSelectorIsOpen) {
            setEmojiSelectorIsOpen()
        }
    })

    const { data: playersData } = useSWR<PlayersDataResponse>(
        `/api/room/${roomId}/players`,
        playersFetcher
    )
    const errorMessage = getErrorMessage(name, emoji, playersData)

    const router = useRouter()
    const [isLoading, setIsLoading] = useToggle(false)
    const [createPlayerError, setCreatePlayerError] = useState('')
    const handleCreatePlayer = async () => {
        try {
            setIsLoading()
            const response = await fetch(`/api/room/${roomId}/player`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emoji,
                    name,
                    roomId,
                }),
            })
            const result: { id: string } | { error: string } =
                await response.json()
            if ('id' in result) {
                setStoredName(name)
                setStoredEmoji(emoji)
                router.push(`/${roomId}/${result.id}`)
            } else {
                throw new Error(result.error)
            }
        } catch (err) {
            if (err instanceof Error) {
                setCreatePlayerError(err.message)
            }
        } finally {
            setIsLoading()
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
                        setName(e.target.value)
                    }}
                    value={name}
                    error={errorMessage || createPlayerError}
                />
            </InputContainer>
            <Button
                text="Enter Lobby"
                onClick={handleCreatePlayer}
                size={ButtonSizes.md}
                noBorderTop
                isDisabled={!name.length || !!errorMessage || isLoading}
                isLoading={isLoading}
            />
        </CreatePlayerContainer>
    )
}

export default CreatePlayer
