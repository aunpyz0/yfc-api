import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const give = { ...req.body }
            if (give.transferDate) {
                give.transferDate = new Date(give.transferDate)
            }
            if (give.chequeDate) {
                give.chequeDate = new Date(give.chequeDate)
            }
            if (give.giveFrom) {
                give.giveFrom = new Date(give.giveFrom)
            }
            if (give.giveTo) {
                give.giveTo = new Date(give.giveTo)
            }
            
            await prisma.give.create({
                data: give
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.give.update({
                where: { id },
                data: { ...req.body }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.give.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gives = await prisma.give.findMany({
                include: {
                    supporter: true,
                    owner: true,
                    paymentType: true,
                    giveType: true,
                    department: true,
                }
            })
            return res.json(gives)
        } catch (e) {
            next(e)
        }
    })

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const give = await prisma.give.findFirst({
                where: { id },
                include: {
                    supporter: true,
                    owner: true,
                    paymentType: true,
                    giveType: true,
                    department: true,
                }
            })
            return res.json(give)
        } catch (e) {
            next(e)
        }
    })

    return router
}