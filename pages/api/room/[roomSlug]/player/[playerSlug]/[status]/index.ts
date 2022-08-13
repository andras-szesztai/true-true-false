import { NextApiRequest, NextApiResponse } from 'next'

import { GET_PLAYER_REQUEST_FIELD } from 'constants/requests'
import { GENERAL_ERROR } from 'constants/messages'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.playerSlug === 'string') {
        try {
            const player = await prisma.player.update({
                where: {
                    slug: req.query.playerSlug,
                },
                data: {
                    isActive: req.query.status === 'connect',
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
    return res.status(400).json({
        error: 'Invalid Player Slug',
    })
}
