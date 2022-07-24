import { NameContainer } from './styles'
import { Props } from './types'

const PlayerTile = ({ name, noBorderTop, isOffline }: Props) => (
    <NameContainer isOffline={isOffline} noBorderTop={noBorderTop}>
        {name}
    </NameContainer>
)

export default PlayerTile
