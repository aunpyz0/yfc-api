import { PrismaClient } from '@prisma/client'
import { Router, NextFunction, Request, Response } from 'express'
import requireStaff from '../middleware/requireStaff'

export default function(prisma: PrismaClient): Router {
    const router = Router()
    router.post('/', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            await prisma.token.deleteMany({
                where: {
                    staffId: req.user!.id
                }
            })
            return res.sendStatus(200)
        } catch(e) {
            next(e)
        }
    })
    return router
}
