import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    player: GetPlayerResponseSuccess
    players: GetPlayersResponseSuccess
}
