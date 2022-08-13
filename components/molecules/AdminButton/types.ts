import { ButtonSizes } from 'components/atoms/Button'
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
        size?: ButtonSizes
        noSuccessMessage?: boolean
    }
