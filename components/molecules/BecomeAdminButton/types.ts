import {
    GetPlayerResponseSuccess,
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    players: GetPlayersResponseSuccess | null
    roomSlug: GetPlayerResponseSuccess['slug'] | undefined
    playerSlug: GetRoomResponseSuccess['slug'] | undefined
}
