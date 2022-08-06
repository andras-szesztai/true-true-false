import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (query.playerSlug && typeof query.playerSlug === 'string') {
        try {
            const player = await prisma.player.findUnique({
                where: {
                    slug: query.playerSlug,
                },
                select: {
                    showLoading: true,
                },
            })
            if (!player) {
                return res.status(404).json({
                    error: 'Could Not Find Player By Provided Player Slug',
                })
            }
            await prisma.player.update({
                where: {
                    slug: query.playerSlug,
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
    }
}
