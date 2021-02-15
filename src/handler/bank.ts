import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body
            await prisma.bank.create({
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
            await prisma.bank.update({
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
            await prisma.bank.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const banks = await prisma.bank.findMany()
            return res.json(banks)
        } catch (e) {
            next(e)
        }
    })

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const bank = await prisma.bank.findFirst({
                where: { id }
            })
            return res.json(bank)
        } catch (e) {
            next(e)
        }
    })

    return router
}