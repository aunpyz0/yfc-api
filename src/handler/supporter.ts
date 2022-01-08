import express, { NextFunction, Request, Response, Router } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'
import prisma from '../prisma'

export default function(): Router {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.get('/supporters', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const supporters = await prisma.supporter.findMany()
            return res.json(supporters)
        } catch (e) {
            next(e)
        }
    })

    return router
}