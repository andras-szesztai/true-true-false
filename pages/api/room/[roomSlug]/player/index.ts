import { GENERAL_ERROR } from 'constants/messages'
import {
    GET_ROOM_REQUEST_FIELDS,
    POST_PLAYER_REQUEST_FIELD,
} from 'constants/requests'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { generateSlug } from 'utils/slug'

const DUPLICATE_ERROR = 'Unique constraint failed on the fields: (`slug`)'

const createPlayer = async (roomId: number, body: any) => {
    const slug = generateSlug(10)
    try {
        const player = await prisma.player.create({
            data: {
                roomId,
                name: body.name,
                emoji: body.emoji,
                slug,
                isActive: true,
                role: body.role,
            },
            select: POST_PLAYER_REQUEST_FIELD,
        })
        return player
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes(DUPLICATE_ERROR)) {
                createPlayer(roomId, body)
            } else {
                return err.message
            }
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: req.query.roomSlug,
                },
                select: GET_ROOM_REQUEST_FIELDS,
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            } else {
                const result = await createPlayer(room.id, req.body)
                if (typeof result !== 'string') {
                    return res.status(200).json(result)
                }
                return res.status(500).json({ error: result || GENERAL_ERROR })
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
