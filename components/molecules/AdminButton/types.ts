import {
    GetPlayerResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

export type AdminButtonProps = Pick<GetPlayerResponseSuccess, 'role'> &
    Pick<GetRoomResponseSuccess, 'slug'> & {
        isDisabled: boolean
        text: string
        apiRoute?: string
        postBody?: Record<string, string>
        onClick?: () => void
        isLoading?: boolean
        isSuccess?: boolean
        error?: string
    }
