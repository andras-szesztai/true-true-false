import { NextApiRequest, NextApiResponse } from 'next'

import { GET_PLAYER_REQUEST_FIELD } from 'constants/requests'
import { GENERAL_ERROR } from 'constants/messages'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (query.playerSlug && typeof query.playerSlug === 'string') {
        try {
            const player = await prisma.player.update({
                where: {
                    slug: query.playerSlug,
                },
                data: {
                    isActive: true,
                },
                select: GET_PLAYER_REQUEST_FIELD,
            })
            if (!player) {
                return res.status(404).json({
                    error: 'Could Not Find Player By Provided Player Slug',
                })
            }
            return res.status(200).json(player)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
}
