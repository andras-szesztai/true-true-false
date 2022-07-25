import { MouseEvent } from 'react'

export enum ButtonSizes {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

export type StyleProps = 'size' | 'noBorderTop' | 'isDisabled' | 'isLoading'

export interface Props {
    text: string
    size: ButtonSizes
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    noBorderTop?: boolean
    isDisabled?: boolean
    isLoading?: boolean
}
