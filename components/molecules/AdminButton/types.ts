import { ButtonSizes } from 'components/atoms/Button'
import {
    GetPlayerResponseSuccess,
    GetRoomResponseSuccess,
} from 'types/apiResponses'

export type AdminButtonProps = Pick<GetPlayerResponseSuccess, 'role'> &
    Pick<GetRoomResponseSuccess, 'slug'> & {
        text: string
        isDisabled?: boolean
        apiRoute?: string
        size?: ButtonSizes
        noSuccessMessage?: boolean
    }
