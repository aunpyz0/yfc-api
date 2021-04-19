import { PrismaClient } from '@prisma/client'
import { Router, NextFunction, Request, Response } from 'express'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient): Router {
    const router = Router()

    router.post('/logout', setStaff(prisma), requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            await prisma.staff.update({
                data: {
                    token: null,
                },
                where: {
                    id: req.user!.id
                }
            })
            return res.sendStatus(200)
        } catch(e) {
            next(e)
        }
    })

    return router
}
