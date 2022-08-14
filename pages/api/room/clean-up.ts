import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const now = new Date()
        const oldRooms = await prisma.room.findMany({
            where: {
                createdAt: {
                    lte: new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() - 7 // created more than a week ago
                    ),
                },
            },
            select: {
                id: true,
            },
        })
        if (!oldRooms.length) {
            return res.status(200).json({ success: true })
        }
        await prisma.room.deleteMany({
            where: {
                id: {
                    in: oldRooms.map((r) => r.id),
                },
            },
        })
        return res.status(200).json({ success: true })
    } catch (err) {
        if (err instanceof Error) {
            console.error(err)
            return res.status(500).json({
                error: GENERAL_ERROR,
            })
        }
    }
}
