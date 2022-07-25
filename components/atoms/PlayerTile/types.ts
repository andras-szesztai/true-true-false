import { Player } from '@prisma/client'

export type StyleProps = 'noBorderTop' | 'isOffline'

export interface Props extends Pick<Player, 'name' | 'emoji'> {
    name: string
    isOffline: boolean
    noBorderTop?: boolean
}
