import styled from '@emotion/styled'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { HomePageContainer } from 'components/atoms/containers/HomePageContainer'
import { Link, LinkSizes } from 'components/atoms/Link'
import { MainTitle } from 'components/atoms/MainTitle'
import { useState } from 'react'
import { designTokens } from 'styles/designTokens'
import { generateRoomId } from 'utils/roomId'

const JoinRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    text-align: center;
    line-height: 1;
    padding: ${designTokens.space.md}px ${designTokens.space.xxl}px;
    font-size: ${designTokens.fontSize.xl};
    background-color: ${designTokens.color.background};
    border: ${designTokens.strokeWidth.md}px solid ${designTokens.color.black};

    ::placeholder {
        color: ${designTokens.color.black};
    }
`

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('')
    return (
        <JoinRoomContainer>
            <Input
                type="text"
                maxLength={5}
                placeholder="Enter Room ID"
                onChange={(e) => {
                    setRoomId(e.target.value)
                }}
            />
            <Link
                href={roomId}
                text="Join"
                size={LinkSizes.md}
                noBorderTop
                disabled={roomId.length !== 5}
            />
        </JoinRoomContainer>
    )
}

const Home = () => (
    <HomePageContainer>
        <HomeContentContainer>
            <MainTitle>TrueTrueFalse</MainTitle>
            <Link
                href={generateRoomId(5)}
                text="Create a Room"
                size={LinkSizes.lg}
            />
            <JoinRoom />
        </HomeContentContainer>
    </HomePageContainer>
)

export default Home
