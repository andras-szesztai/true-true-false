import { NextApiRequest, NextApiResponse } from 'next'
import { RoomStage } from '@prisma/client'

import { generateSlug } from 'utils/slug'
import { prisma } from 'utils/prisma'
import { POST_ROOM_REQUEST_FIELDS } from 'constants/requests'
import { GENERAL_ERROR } from 'constants/messages'

const DUPLICATE_ERROR = 'Unique constraint failed on the fields: (`slug`)'

const createRoom = async () => {
    const slug = generateSlug()
    try {
        const room = await prisma.room.create({
            data: {
                slug,
                stage: RoomStage.LOBBY,
            },
            select: POST_ROOM_REQUEST_FIELDS,
        })
        return room
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes(DUPLICATE_ERROR)) {
                createRoom()
            } else {
                return err.message
            }
        }
    }
}

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await createRoom()
    if (result && typeof result !== 'string') {
        return res.status(200).json(result)
    }
    return res.status(500).json({ error: GENERAL_ERROR })
}
