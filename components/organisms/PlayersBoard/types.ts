import { PlayerTileSize } from 'components/molecules/PlayerTile'
import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    players: GetPlayersResponseSuccess
    size: PlayerTileSize
    player?: GetPlayerResponseSuccess
    isFixed?: boolean
    isLoading?: boolean
    fullWidth?: boolean
    displayScore?: boolean
}
