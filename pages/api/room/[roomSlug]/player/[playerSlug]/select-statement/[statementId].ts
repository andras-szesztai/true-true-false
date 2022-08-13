import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.playerSlug === 'string') {
        if (typeof req.query.statementId === 'string') {
            try {
                await prisma.player.update({
                    where: {
                        slug: req.query.playerSlug,
                    },
                    data: {
                        showLoading: false,
                        selectedAnswerId: +req.query.statementId,
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
            error: 'Invalid Statement Id',
        })
    }
    return res.status(400).json({
        error: 'Invalid Player Slug',
    })
}
