import { NextApiRequest, NextApiResponse } from 'next'

import { generateSlug } from 'utils/roomId'
import { prisma } from 'utils/prisma'
import { RoomStage } from '@prisma/client'

const DUPLICATE_ERROR = 'Unique constraint failed on the fields: (`slug`)'

const createRoom = async () => {
    const slug = generateSlug()
    try {
        const room = await prisma.room.create({
            data: {
                slug,
                stage: RoomStage.LOBBY,
            },
        })
        return room
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes(DUPLICATE_ERROR)) {
                createRoom() // Regenerate slug
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
        return res.status(200).json({ slug: result.slug })
    }
    return res.status(500).json({ error: 'Something went wrong' })
}
