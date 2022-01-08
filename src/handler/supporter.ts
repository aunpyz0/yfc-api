import express, { NextFunction, Request, Response, Router } from 'express'
// import requireAccountant from '../middleware/requireAccountant'
// import requireStaff from '../middleware/requireStaff'
// import setStaff from '../middleware/setStaff'
import prisma from '../prisma'
import multer from 'multer'
import Excel from 'exceljs'

const upload = multer()

export default function(): Router {
    const router = express.Router()

    // router.use(setStaff())

    router.get('/supporters', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const supporters = await prisma.supporter.findMany()
            return res.json(supporters)
        } catch (e) {
            next(e)
        }
    })

    router.post('/supporters/import', upload.single('data'), async (req: Request, res: Response, next: NextFunction) => {
        const workbook = new Excel.Workbook()
        await workbook.xlsx.load(req.file.buffer)
        const worksheet = workbook.worksheets[0]
        const supporters = []
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i)
            const supporter = {
                suppporterID: row.getCell(1).value,
                firstname: row.getCell(2).value,
                lastname: row.getCell(3).value,
            }
            supporters.push(supporter)
        }
        
        res.json(supporters)
    })

    return router
}