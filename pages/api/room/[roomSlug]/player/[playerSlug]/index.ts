import { NextApiRequest, NextApiResponse } from 'next'

import { GET_PLAYER_REQUEST_FIELD } from 'constants/requests'
import { GENERAL_ERROR } from 'constants/messages'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        if (typeof req.query.playerSlug === 'string') {
            try {
                const room = await prisma.room.findUnique({
                    where: {
                        slug: req.query.roomSlug,
                    },
                    select: {
                        players: {
                            where: {
                                slug: req.query.playerSlug,
                            },
                            select: GET_PLAYER_REQUEST_FIELD,
                        },
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided Room Slug',
                    })
                }
                if (!room.players[0]) {
                    return res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                }
                return res.status(200).json(room.players[0])
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({
                        error: GENERAL_ERROR,
                    })
                }
            }
        }
        return res.status(400).json({
            error: 'Invalid Player Slug',
        })
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
