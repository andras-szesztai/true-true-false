import { HomeContentContainer } from 'components/atoms/containers/HomeContentContainer'
import { PlayerTileSize } from 'components/molecules/PlayerTile'
import { PlayersBoard } from 'components/organisms/PlayersBoard'
import { Props } from './types'

const ResultsPageContent = ({ players }: Props) => {
    return (
        <HomeContentContainer>
            <PlayersBoard
                players={players}
                size={PlayerTileSize.lg}
                displayScore
            />
        </HomeContentContainer>
    )
}

export default ResultsPageContent
