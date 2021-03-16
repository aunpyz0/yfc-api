import express, { Application, Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import dotenv from 'dotenv'
import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'
import roleRouter from './handler/role'
import staffRouter from './handler/staff'
import supporterRouter from './handler/supporter'
import departmentRouter from './handler/department'
import giveTypeRouter from './handler/giveType'
import bankRouter from './handler/bank'
import giveRouter from './handler/give'
import paymentTypeRouter from './handler/paymentType'
import loginRouter from './handler/login'
import setStaff from './middleware/setStaff'

dotenv.config()

const PORT = process.env.PORT || 8080
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

const app: Application = express()
const prisma = new PrismaClient()

app.use(helmet())
app.use(cors({
    origin: CORS_ORIGIN
}))
app.use(urlencoded())
app.use(json())

app.use(setStaff(prisma))
app.get('/', (req, res) => res.send('ok'))
app.use('/evidence', express.static('uploads'))

app.use('/login', loginRouter(prisma))

app.use('/roles', roleRouter(prisma))
app.use('/staffs', staffRouter(prisma))
app.use('/supporters', supporterRouter(prisma))
app.use('/departments', departmentRouter(prisma))
app.use('/givetypes', giveTypeRouter(prisma))
app.use('/banks', bankRouter(prisma))
app.use('/paymenttypes', paymentTypeRouter(prisma))
app.use('/gives', giveRouter(prisma))

app.use((err: Error, req: Request , res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send(err.message)
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))