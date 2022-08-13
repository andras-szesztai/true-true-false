import { Role } from '@prisma/client'

import { GetRoomResponseSuccess } from 'types/apiResponses'

export interface Props {
    questionsLeft: number
    playerRole: Role
    roomSlug: GetRoomResponseSuccess['slug']
    adminButtonIsEnabled: boolean
}
