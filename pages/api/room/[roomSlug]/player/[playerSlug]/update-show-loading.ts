import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

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
                            select: {
                                showLoading: true,
                            },
                        },
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided Room Slug',
                    })
                }
                const player = room.players[0]
                if (!player) {
                    return res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                }
                await prisma.player.update({
                    where: {
                        slug: req.query.playerSlug,
                    },
                    data: {
                        showLoading: !player.showLoading,
                    },
                })
                return res.status(200).json({ success: true })
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({
                        error: GENERAL_ERROR,
                    })
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
}
