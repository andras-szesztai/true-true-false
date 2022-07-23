import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req
    if (method === 'GET' && query.roomId && typeof query.roomId === 'string') {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomId,
                },
                select: {
                    slug: true,
                    id: true,
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            } else {
                return res.status(200).json({ slug: room.slug, id: room.id })
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: 'Sorry, Something Went Wrong',
                })
            }
        }
    }
}
