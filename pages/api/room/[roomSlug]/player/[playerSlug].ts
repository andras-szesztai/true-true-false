import { NextApiRequest, NextApiResponse } from 'next'

import { GET_PLAYER_REQUEST_FIELD } from 'constants/requests'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.roomSlug &&
        typeof query.roomSlug === 'string' &&
        query.playerSlug &&
        typeof query.playerSlug === 'string'
    ) {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomSlug,
                },
                select: {
                    players: {
                        select: GET_PLAYER_REQUEST_FIELD,
                    },
                },
            })
            if (!room) {
                return res.status(404).json({
                    error: 'Could Not Find Room By Provided Room Slug',
                })
            } else {
                const currPlayer = room.players.find(
                    (d) => d.slug === query.playerSlug
                )
                if (!currPlayer) {
                    return res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                } else {
                    return res.status(200).json(currPlayer)
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: 'Sorry, Something Went Wrong',
                })
            }
        }
    }
}
