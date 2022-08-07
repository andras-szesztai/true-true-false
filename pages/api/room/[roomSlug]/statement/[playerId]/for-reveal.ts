import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { RoundStage } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.roomSlug &&
        typeof query.roomSlug === 'string' &&
        query.playerId &&
        typeof query.playerId === 'string'
    ) {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomSlug,
                },
                select: {
                    roundStage: true,
                    id: true,
                },
            })
            if (!room) {
                return res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            }
            if (room.roundStage !== RoundStage.QUESTIONING) {
                return res.status(401).json({
                    error: 'Sorry, Room Stage is Incorrect',
                })
            }
            const falseStatement = await prisma.statement.findMany({
                where: {
                    playerId: +query.playerId,
                    isTrue: false,
                },
                select: {
                    id: true,
                },
            })
            if (!falseStatement) {
                return res.status(404).json({
                    error: 'Could Not Find Statements By Provided Player ID',
                })
            }
            const guesses = await prisma.player.findMany({
                where: {
                    roomId: room.id,
                },
                select: {
                    id: true,
                    selectedAnswerId: true,
                },
            })
            if (!guesses) {
                return res.status(404).json({
                    error: 'Could Not Find Guesses By Provided Room ID',
                })
            }
            await prisma.room.update({
                where: {
                    id: room.id,
                },
                data: {
                    roundStage: RoundStage.QUESS_REVEAL,
                },
            })
            return res
                .status(200)
                .json({ falseStatement: falseStatement[0], guesses })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
}
