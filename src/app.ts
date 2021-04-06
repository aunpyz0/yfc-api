import express, { Application, Request, Response, NextFunction, Router } from 'express'
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
import logoutRouter from './handler/logout'
import refreshRouter from './handler/refresh'
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
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/', (req, res) => res.send('ok'))
app.use('/evidence', express.static('uploads'))
app.use('/login', loginRouter(prisma))
app.use('/refresh', refreshRouter(prisma))
app.use('/me', setStaff(prisma), profileRouter())
app.use('/logout', setStaff(prisma), logoutRouter(prisma))
app.use('/roles', setStaff(prisma), roleRouter(prisma))
app.use('/staffs', setStaff(prisma), staffRouter(prisma))
app.use('/supporters', setStaff(prisma), supporterRouter(prisma))
app.use('/departments', setStaff(prisma), departmentRouter(prisma))
app.use('/givetypes', setStaff(prisma), giveTypeRouter(prisma))
app.use('/banks',  setStaff(prisma), bankRouter(prisma))
app.use('/paymenttypes', setStaff(prisma), paymentTypeRouter(prisma))
app.use('/gives',  setStaff(prisma), giveRouter(prisma))

app.use((err: Error, req: Request , res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send(err.message)
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))