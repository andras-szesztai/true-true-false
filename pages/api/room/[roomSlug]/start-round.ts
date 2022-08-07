import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { random } from 'lodash'
import { RoundStage } from '@prisma/client'

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
                    id: true,
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            } else {
                await prisma.player.updateMany({
                    where: {
                        roomId: room.id,
                    },
                    data: {
                        showLoading: true,
                        selectedAnswerId: null,
                    },
                })
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
                    res.status(404).json({
                        error: 'Could Not Find Players By Provided Room ID',
                    })
                } else {
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
                    await prisma.player.update({
                        where: {
                            id: nextSelectedPlayerId,
                        },
                        data: {
                            isDone: true,
                        },
                    })
                    return res.status(200).json({ success: true })
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
}
