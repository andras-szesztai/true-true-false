import { NextApiRequest, NextApiResponse } from 'next'
import { Statement } from '@prisma/client'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query, method, body } = req
    if (query.playerSlug && typeof query.playerSlug === 'string') {
        if (method === 'POST') {
            try {
                const player = await prisma.player.findUnique({
                    where: {
                        slug: query.playerSlug,
                    },
                    select: {
                        id: true,
                    },
                })
                if (!player) {
                    return res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                }
                const statements = await prisma.statement.createMany({
                    data: body.map((d: Pick<Statement, 'text' | 'isTrue'>) => ({
                        ...d,
                        playerId: player.id,
                    })),
                })
                if (!statements) {
                    return res.status(404).json({
                        error: 'Could Not Add Statements to Database',
                    })
                }
                await prisma.player.update({
                    where: {
                        slug: query.playerSlug,
                    },
                    data: {
                        showLoading: false,
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
    }
}
