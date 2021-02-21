import { PrismaClient, Prisma } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'

export default function(prisma: PrismaClient) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
            cb(null, `${uniqueName}${path.extname(file.originalname)}`)
        }
    })
    const upload = multer({ storage })
    const router = express.Router()

    router.post('/', upload.single('evidence'), async (req: Request, res: Response, next: NextFunction) => {
        try {
            await prisma.give.create({
                data: parseGive(req)
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/:id', upload.single('evidence'), async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10)
        try {
            if (req.file && req.file.filename) {
                const found = await prisma.give.findFirst({
                    where: { id },
                })
                if (found) {
                    await fs.promises.unlink(`uploads/${found.evidence}`)
                }
            }
        } catch(e) {
            console.error(e)
        }

        try {
            await prisma.give.update({
                where: { id },
                data: parseGive(req)
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const deleted = await prisma.give.delete({
                where: { id }
            })
            await fs.promises.unlink(`uploads/${deleted.evidence}`)
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
                    transferFromBank: true,
                    transferToBank: true,
                    chequeBank: true,
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

    function parseGive(req: Request): Prisma.GiveUncheckedCreateInput {
        const give: Prisma.GiveUncheckedCreateInput = { 
            supporterId: Number(req.body.supporterId),
            ownerId: Number(req.body.ownerId),
            amount: Number(req.body.amount),
            paymentTypeId: Number(req.body.paymentTypeId),
            giveTypeId: Number(req.body.giveTypeId),
            departmentId: Number(req.body.departmentId),
        }
        if (give.paymentTypeId === 1) {
            give.transferDate = new Date(req.body.transferDate)
            give.transferFromBankId = Number(req.body.transferFromBankId)
            give.transferToBankId = Number(req.body.transferToBankId)
            
        }
        if (give.paymentTypeId === 2) {
            give.receiveDate = new Date(req.body.receiveDate)
        }
        if (give.paymentTypeId === 3) {
            give.chequeBankId = Number(req.body.chequeBankId)
            give.chequeBankBranch = req.body.chequeBankBranch
            give.chequeNumber = req.body.chequeNumber
            give.chequeDate = new Date(req.body.chequeDate)
        }
        if (give.giveTypeId === 1) {
            give.giveFrom = new Date(req.body.giveFrom)
            give.giveTo = new Date(req.body.giveTo)
        }
        if (req.file && req.file.filename) {
            give.evidence = req.file.filename
        }

        return give
    }

    return router
}