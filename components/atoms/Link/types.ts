export enum LinkSizes {
    md = 'md',
    lg = 'lg',
}

export interface Props {
    text: string
    size: LinkSizes
    href: string
}
