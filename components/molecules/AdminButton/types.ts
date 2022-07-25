import {
    GetPlayerResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

type ApiRoutes = '/update-stage'

export type AdminButtonProps = Pick<GetPlayerResponseSuccess, 'role'> &
    Pick<GetRoomResponseSuccess, 'slug'> & {
        isDisabled: boolean
        text: string
        apiRoute: ApiRoutes
        postBody: Record<string, string>
    }
