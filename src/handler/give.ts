import { PrismaClient, Prisma, Role } from '@prisma/client'
import fs from 'fs'
import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'
import { TRANSFER, CHEQUE } from '../constant/paymentType'
import { tr } from 'date-fns/locale'

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

    router.use(setStaff(prisma))

    router.post('/gives', requireStaff, upload.single('evidence'), async (req: Request, res: Response, next: NextFunction) => {
        // TODO:
        // Transaction
        // Validation
        // Error handling

        const staff = req.user!
        const data = req.body
        
        try {
            let giveData = {
                supporterId: data.supporterId,
                receiverId: staff.id,
                amount: data.amount,
                evidence: req.file && req.file.filename,
            }
            const give = await prisma.give.create({ data: giveData })

            if (data.paymentType === TRANSFER) {
                const transferDetail = {
                    giveId: give.id,
                    transferDate: data.transferDate,
                    transferFromBankId: data.transferFromBankId,
                    transferToBankId: data.transferToBankId,
                }
                await prisma.transferDetail.create({ data: transferDetail })
            }

            else if (data.paymentType === CHEQUE) {
                const chequeDetail = {
                    giveId: give.id,
                    chequeBankId: data.chequeBankId,
                    chequeBankBranch: data.chequeBankBranch,
                    chequeNo: data.chequeNo,
                    chequeDate: data.chequeDate
                }
                await prisma.chequeDetail.create({ data: chequeDetail })
            }
            else {
                return res.status(400).send({
                    message: 'Payment type is invalid'
                })
            }
            
            res.sendStatus(200)

        } catch (e) {
            next(e)
        }
    })

    router.put('/gives/:id', requireStaff, upload.single('evidence'), async (req: Request, res: Response, next: NextFunction) => {
        // TODO:
        // Transaction
        // Validation
        // Error handling

        const giveId = parseInt(req.params.id, 10)
        try {
            if (req.file && req.file.filename) {
                const found = await prisma.give.findFirst({
                    where: { id: giveId },
                })
                if (found) {
                    await fs.promises.unlink(`uploads/${found.evidence}`)
                }
            }
        } catch(e) {
            console.error(e)
        }

        try {
            const staff = req.user!
            const data = req.body
            let giveData = {
                supporterId: data.supporterId,
                receiverId: staff.id,
                amount: data.amount,
                evidence: req.file && req.file.filename,
            }

            const give = await prisma.give.update({ 
                where: { id: giveId },
                data: giveData 
            })

            if (data.paymentType === TRANSFER) {
                await prisma.chequeDetail.delete({
                    where: { giveId: giveId },
                })
                await prisma.transferDetail.upsert({
                    where: {
                        giveId: giveId
                    },
                    update: {
                        transferDate: data.transferDate,
                        transferFromBankId: data.transferFromBankId,
                        transferToBankId: data.transferToBankId,
                    },
                    create: {
                        giveId: give.id,
                        transferDate: data.transferDate,
                        transferFromBankId: data.transferFromBankId,
                        transferToBankId: data.transferToBankId,
                    }
                })
            }

            else if (data.paymentType === CHEQUE) {
                await prisma.transferDetail.delete({
                    where: { giveId: giveId },
                })
                await prisma.chequeDetail.upsert({
                    where: {
                        giveId: giveId
                    },
                    update: {
                        chequeBankId: data.chequeBankId,
                        chequeBankBranch: data.chequeBankBranch,
                        chequeNo: data.chequeNo,
                        chequeDate: data.chequeDate
                    },
                    create: {
                        giveId: give.id,
                        chequeBankId: data.chequeBankId,
                        chequeBankBranch: data.chequeBankBranch,
                        chequeNo: data.chequeNo,
                        chequeDate: data.chequeDate
                    }
                })
            }
            else {
                res.status(400).send({
                    message: 'Payment type is invalid'
                })
            }
        } catch (e) {
            next(e)
        }
    })

    router.delete('/gives/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        // TODO:
        // Transaction
        // Validation
        // Error handling

        try {
            const id = parseInt(req.params.id, 10)
            await prisma.transferDetail.delete({
                where: { giveId: id }
            })
            await prisma.chequeDetail.delete({
                where: { giveId: id }
            })
            const deleted = await prisma.give.delete({
                where: { id }
            })
            await fs.promises.unlink(`uploads/${deleted.evidence}`)
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/gives', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        // TODO:
        // Transaction
        // Validation
        // Error handling

        try {
            let option: Prisma.GiveFindManyArgs = {
                include: {
                    supporter: true,
                    receiver: true,
                    transferDetail: true,
                    chequeDetail: true,
                }
            }

            if (req.user!.role === Role.STAFF) {
                option.where = {
                    receiverId: req.user!.id,
                }
            }
            const gives = await prisma.give.findMany(option)
            return res.json(gives)
        } catch (e) {
            next(e)
        }
    })

    router.get('/gives/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const give = await prisma.give.findFirst({
                where: { id },
                include: {
                    supporter: true,
                    receiver: true,
                    transferDetail: true,
                    chequeDetail: true,
                }
            })
            return res.json(give)
        } catch (e) {
            next(e)
        }
    })

    return router
}