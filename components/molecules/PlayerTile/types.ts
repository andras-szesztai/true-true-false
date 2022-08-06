import { Player } from '@prisma/client'

export type StyleProps = 'noBorderTop' | 'isOffline' | 'size'

export enum PlayerTileSize {
    md = 'md',
    lg = 'lg',
}

export interface Props extends Pick<Player, 'name' | 'emoji'> {
    name: string
    isOffline: boolean
    noBorderTop?: boolean
    size: PlayerTileSize
    isLoading?: boolean
}
