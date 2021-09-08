import express, { NextFunction, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'

export default function(prisma: PrismaClient): Router {
    const router = express.Router()

    router.get('/status', (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(200)
    })

    return router
}