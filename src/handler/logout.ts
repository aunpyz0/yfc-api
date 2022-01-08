import { Router, NextFunction, Request, Response } from 'express'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'
import prisma from '../prisma'

export default function(): Router {
    const router = Router()

    router.post('/logout', setStaff(prisma), requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            await prisma.staff.update({
                data: {
                    refreshToken: null,
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
