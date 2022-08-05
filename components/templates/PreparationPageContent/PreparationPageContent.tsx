// 1. Add 3 TextBoxes in column flexbox
// 2. Label them according (last one is false)
// 3. Submit button
// 4. Waiting Text
// 5. Admin should have "everyone is in" button
// 6. PlayersBoard with loading animations when writing + submit + offline
import { useState } from 'react'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'

import { Props } from './types'
import { TextArea, TextBoxesContainer } from './styles'

const PreparationPageContent = ({ room }: Props) => {
    const [firstTrueStatement, setFirstTrueStatement] = useState('')
    const [secondTrueStatement, setSecondTrueStatement] = useState('')
    const [falseStatement, setFalseStatement] = useState('')
    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />
            <TextBoxesContainer>
                <TextArea
                    rows={3}
                    placeholder="True Statement"
                    maxLength={50}
                    onChange={(e) => setFirstTrueStatement(e.target.value)}
                />
                <TextArea
                    rows={3}
                    noBorderTop
                    placeholder="True Statement"
                    onChange={(e) => setSecondTrueStatement(e.target.value)}
                />
                <TextArea
                    rows={3}
                    noBorderTop
                    placeholder="False Statement"
                    onChange={(e) => setFalseStatement(e.target.value)}
                />
            </TextBoxesContainer>
            <Button
                text="Submit"
                size={ButtonSizes.lg}
                onClick={() => {
                    console.log('send statement')
                }}
                // isLoading={isLoading}
                isDisabled={
                    !firstTrueStatement ||
                    !secondTrueStatement ||
                    !falseStatement
                }
            />
        </HomeContentContainer>
    )
}

export default PreparationPageContent
