import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response, Router } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'

export default function(prisma: PrismaClient): Router {
    const router = express.Router()

    router.post('/', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code, firstname, lastname } = req.body
            await prisma.supporter.create({
                data: { 
                    code, 
                    firstname, 
                    lastname 
                }
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { code, firstname, lastname } = req.body
            await prisma.supporter.update({
                where: { id },
                data: { 
                    code, 
                    firstname, 
                    lastname 
                }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.supporter.delete({
                where: { id },
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const supporters = await prisma.supporter.findMany()
            return res.json(supporters)
        } catch (e) {
            next(e)
        }
    })

    router.get('/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const supporter = await prisma.supporter.findFirst({
                where: { id },
            })
            return res.json(supporter)
        } catch (e) {
            next(e)
        }
    })

    return router
}