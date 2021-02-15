import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body
        try {
            await prisma.role.create({
                data: { name }
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10)
        const { name } = req.body
        try {
            await prisma.role.update({
                where: { id },
                data: { name }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10)
        try {
            await prisma.role.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

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