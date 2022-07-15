export enum LinkSizes {
    md = 'md',
    lg = 'lg',
}

export type StyleProps = 'size' | 'noBorderTop'

export interface Props {
    text: string
    size: LinkSizes
    href: string
    noBorderTop?: boolean
}
