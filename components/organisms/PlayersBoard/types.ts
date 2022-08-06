import { PlayerTileSize } from 'components/molecules/PlayerTile'
import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    player: GetPlayerResponseSuccess
    players: GetPlayersResponseSuccess
    size: PlayerTileSize
    isFixed?: boolean
    isLoading?: boolean
}
