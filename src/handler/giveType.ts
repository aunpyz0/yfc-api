import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body
        try {
            await prisma.giveType.create({
                data: { name }
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { name } = req.body
            await prisma.giveType.update({
                where: { id },
                data: { name }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.giveType.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const giveTypes = await prisma.giveType.findMany()
            return res.json(giveTypes)
        } catch (e) {
            next(e)
        }
    })

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const giveType = await prisma.giveType.findFirst({
                where: { id }
            })
            return res.json(giveType)
        } catch (e) {
            next(e)
        }
    })

    return router
}