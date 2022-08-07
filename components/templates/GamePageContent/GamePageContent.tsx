import { useWindowSize } from 'react-use'

import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { RoomSlugSizes, RoomSlugText } from 'components/atoms/RoomSlugText'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { designTokens } from 'styles/designTokens'

import { Props } from './types'

const { breakPoints } = designTokens

// TODO
// 2. Auto start with first random player (room currentPlayerId?) & set everyone to showLoading/empty selectedAnswer (if was)
// 3. Store how many questions are left in the room (managed by admin with - button) visible to everyone
// 4. SelectedAnswer for each player stored when submit answer & showLoading set to false
// 5. Admin clicks reveal + add emojis on each statements as votes
// 6. Reveal which one was false (admin reveals - fetch isTrue statements for currentPlayerId)
// 7. Everyone gets or loses points (check submitted answers)
// 8. Player gets flag as 'done'
// 9. Admin clicks "next" (if there is anyone not done yet) - Otherwise changes stage to END page

const GamePageContent = ({ room, player, players }: Props) => {
    const { width } = useWindowSize()
    const isMobileSize = width <= breakPoints.md

    // const [startNewRoundState, startNewRound] = useAsyncFn(async () => {
    //     // const response = await fetch(url);
    //     // const result = await response.text();
    //     // return result
    //   }, []);

    return (
        <HomeContentContainer>
            <RoomSlugText slug={room.slug} size={RoomSlugSizes.md} />
            <PlayersBoard
                player={player}
                players={players}
                size={PlayerTileSize.md}
                isFixed={!isMobileSize}
                fullWidth
                displayScore
            />
            {/* <AdminButton
                        text="Next round"
                        role={player.role}
                        isDisabled={false}
                        slug={room.slug}
                        apiRoute="/update-stage"
                        postBody={{ stage: RoomStage.GAME }}
                    /> */}
        </HomeContentContainer>
    )
}

export default GamePageContent
