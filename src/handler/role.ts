import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireStaff from '../middleware/requireStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roles = await prisma.role.findMany()
            return res.json(roles)
        } catch (e) {
            next(e)
        }
    })

    return router
}