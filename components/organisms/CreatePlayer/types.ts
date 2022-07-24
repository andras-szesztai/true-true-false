import { Player } from '@prisma/client'

export interface Props {
    roomId: string
    isAdmin: boolean
}

export type PlayersDataResponse =
    | { players: Pick<Player, 'name' | 'emoji'>[] }
    | { error: string }
