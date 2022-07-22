export enum LinkSizes {
    md = 'md',
    lg = 'lg',
}

export type StyleProps = 'size' | 'noBorderTop' | 'isDisabled' | 'isLoading'

export interface Props {
    text: string
    size: LinkSizes
    href: string
    noBorderTop?: boolean
    isDisabled?: boolean
    isLoading?: boolean
}
