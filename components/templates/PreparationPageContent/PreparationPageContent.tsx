// 1. Add 3 TextBoxes in column flexbox
// 2. Label them according (last one is false)
// 3. Submit button
// 4. Waiting Text
// 5. Admin should have "everyone is in" button
// 6. PlayersBoard with loading animations when writing + submit + offline

import { Button, ButtonSizes } from 'components/atoms/Button'
import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'

import { TextArea, TextBoxesContainer } from './styles'

const PreparationPageContent = () => {
    return (
        <HomeContentContainer>
            {/* <RoomSlugText slug={room.slug} /> */}
            <TextBoxesContainer>
                <TextArea
                    rows={3}
                    placeholder="Enter True Statement"
                    maxLength={50}
                />
                <TextArea
                    rows={3}
                    noBorderTop
                    placeholder="Enter True Statement"
                />
                <TextArea
                    rows={3}
                    noBorderTop
                    placeholder="Enter False Statement"
                />
            </TextBoxesContainer>
            <Button
                text="Submit"
                size={ButtonSizes.lg}
                onClick={() => {
                    console.log('send statement')
                }}
                // isLoading={isLoading}
                // isDisabled={isDisabled || isLoading}
            />
        </HomeContentContainer>
    )
}

export default PreparationPageContent
