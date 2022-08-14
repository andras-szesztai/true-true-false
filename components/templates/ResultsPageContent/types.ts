import { Role } from '@prisma/client'

import {
    GetPlayersResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

export interface Props {
    players: GetPlayersResponseSuccess
    playerRole: Role
    roomSlug: GetRoomResponseSuccess['slug']
    isDeleteStarted: GetRoomResponseSuccess['isDeleteStarted']
}
