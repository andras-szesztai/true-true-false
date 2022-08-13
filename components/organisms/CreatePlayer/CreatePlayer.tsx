import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useClickAway, useKey, useLocalStorage, useToggle } from 'react-use'
import useSWR from 'swr'
import { Role } from '@prisma/client'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { Input } from 'components/molecules/Input'
import { useAsyncFn } from 'hooks/useAsyncFn/useAsyncFn'
import { fetcher } from 'utils/fetcher'
import {
    GetPlayersResponse,
    PostPlayerResponseSuccess,
} from 'types/apiResponses'

import { Props } from './types'
import { getErrorMessage, getRandomEmoji } from './utils'
import {
    ButtonContainer,
    CreatePlayerContainer,
    EmojiSelectorButton,
    EmojiSelectorContainer,
    InputContainer,
} from './styles'

const Picker = dynamic(
    () => {
        return import('emoji-picker-react')
    },
    { ssr: false }
)

const CreatePlayer = ({ roomSlug, isAdmin }: Props) => {
    const [storedName, setStoredName] = useLocalStorage('name', '')
    const [storedEmoji, setStoredEmoji] = useLocalStorage('emoji', '')
    const [name, setName] = useState(storedName || '')
    const [emoji, setEmoji] = useState<string>(storedEmoji || getRandomEmoji())

    const [emojiSelectorIsOpen, setEmojiSelectorIsOpen] = useToggle(false)
    useKey('Escape', () => {
        setEmojiSelectorIsOpen(false)
    })
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(ref, () => {
        if (emojiSelectorIsOpen) {
            setEmojiSelectorIsOpen()
        }
    })

    const { data: playersData } = useSWR<GetPlayersResponse>(
        `/api/room/${roomSlug}/players`,
        fetcher
    )

    const errorMessage = getErrorMessage(name, emoji, playersData)

    const [handleCreatePlayer, { data, loading, error }] =
        useAsyncFn<PostPlayerResponseSuccess>(() =>
            fetch(`/api/room/${roomSlug}/player`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emoji,
                    name,
                    roomSlug,
                    role: isAdmin ? Role.ADMIN : Role.USER,
                }),
            })
        )

    const router = useRouter()
    useEffect(() => {
        if (data) {
            setStoredName(name)
            setStoredEmoji(emoji)
            router.push(`/${roomSlug}/game/${data.slug}`)
        }
    }, [emoji, name, roomSlug, router, setStoredEmoji, setStoredName, data])

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
                    error={errorMessage || error}
                />
            </InputContainer>
            <Button
                text="Enter Lobby"
                onClick={handleCreatePlayer}
                size={ButtonSizes.md}
                noBorderTop
                isDisabled={!name.length || !!errorMessage || loading}
                isLoading={loading}
            />
        </CreatePlayerContainer>
    )
}

export default CreatePlayer
