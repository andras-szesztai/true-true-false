import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '@prisma/client'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { PlayerPoint } from 'types/points'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, body } = req
    if (query.playerSlug && typeof query.playerSlug === 'string') {
        try {
            const player = await prisma.player.findUnique({
                where: {
                    slug: query.playerSlug,
                },
                select: {
                    role: true,
                },
            })
            if (!player) {
                return res.status(404).json({
                    error: 'Could Not Find Player By Provided Player Slug',
                })
            }
            if (player.role !== Role.ADMIN) {
                return res.status(404).json({
                    error: 'Only Admin Users Can Update Scores',
                })
            }
            await Promise.all(
                body.map(async (player: PlayerPoint) => {
                    await prisma.player.update({
                        where: {
                            id: player.playerId,
                        },
                        data: {
                            score: player.score,
                        },
                    })
                })
            )
            return res.status(200).json({ success: true })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
}
