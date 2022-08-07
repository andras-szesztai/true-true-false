import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.playerSlug &&
        typeof query.playerSlug === 'string' &&
        query.statementId &&
        typeof query.statementId === 'string'
    ) {
        try {
            await prisma.player.update({
                where: {
                    slug: query.playerSlug,
                },
                data: {
                    showLoading: false,
                    selectedAnswerId: +query.statementId,
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
