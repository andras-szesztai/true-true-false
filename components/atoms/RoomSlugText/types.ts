import { GetRoomResponseSuccess } from 'types/apiResponses'

export enum RoomSlugSizes {
    md = 'md',
    lg = 'lg',
}

export interface Props {
    slug: GetRoomResponseSuccess['slug'] | undefined
    size: RoomSlugSizes
}
