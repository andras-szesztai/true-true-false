import { GET_PLAYERS_REQUEST_FIELDS } from 'constants/requests'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (query.roomSlug && typeof query.roomSlug === 'string') {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomSlug,
                },
                select: {
                    players: {
                        select: GET_PLAYERS_REQUEST_FIELDS,
                    },
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            } else {
                return res.status(200).json(room.players)
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
