import { RoundStage } from '@prisma/client'
import { random } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

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
                select: {
                    id: true,
                },
            })
            if (!room) {
                return res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            }
            const players = await prisma.player.findMany({
                where: {
                    roomId: room.id,
                },
                select: {
                    id: true,
                    isDone: true,
                    statements: true,
                },
            })
            if (!players) {
                return res.status(404).json({
                    error: 'Could Not Find Players By Provided Room ID',
                })
            }
            const remainingPlayers = players
                .filter((d) => !d.isDone && !!d.statements.length)
                .map((d) => d.id)
            const nextSelectedPlayerId =
                remainingPlayers[random(0, remainingPlayers.length - 1)]
            await prisma.room.update({
                where: {
                    id: room.id,
                },
                data: {
                    questionsLeft: 10,
                    roundStage: RoundStage.QUESTION,
                    selectedPlayerId: nextSelectedPlayerId,
                    isLastRound: remainingPlayers.length === 1,
                },
            })
            await prisma.player.updateMany({
                where: {
                    roomId: room.id,
                    NOT: {
                        id: {
                            equals: nextSelectedPlayerId,
                        },
                    },
                },
                data: {
                    showLoading: true,
                    selectedAnswerId: null,
                },
            })
            await prisma.player.update({
                where: {
                    id: nextSelectedPlayerId,
                },
                data: {
                    selectedAnswerId: null,
                    isDone: true,
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
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
