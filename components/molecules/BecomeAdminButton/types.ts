import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    players: GetPlayersResponseSuccess
    roomSlug: GetPlayerResponseSuccess['slug']
    playerSlug: GetRoomResponseSuccess['slug']
}
