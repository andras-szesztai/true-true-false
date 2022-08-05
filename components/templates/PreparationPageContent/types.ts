import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    room: GetRoomResponseSuccess
    player: GetPlayerResponseSuccess
    players: GetPlayersResponseSuccess
}
