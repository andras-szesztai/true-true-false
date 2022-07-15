export enum LinkSizes {
    md = 'md',
    lg = 'lg',
}

export type StyleProps = 'size' | 'noBorderTop' | 'disabled'

export interface Props {
    text: string
    size: LinkSizes
    href: string
    noBorderTop?: boolean
    disabled?: boolean
}
