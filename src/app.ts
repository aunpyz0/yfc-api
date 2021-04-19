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
console.log('CORS_ORIGIN', CORS_ORIGIN)

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
app.use(loginRouter(prisma))
app.use(refreshRouter(prisma))
app.use(logoutRouter(prisma))
app.use(roleRouter(prisma))
app.use(staffRouter(prisma))
app.use(supporterRouter(prisma))
app.use(departmentRouter(prisma))
app.use(giveTypeRouter(prisma))
app.use(bankRouter(prisma))
app.use(paymentTypeRouter(prisma))
app.use(giveRouter(prisma))

app.use((err: Error, req: Request , res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send(err.message)
})

app.listen(PORT, () => console.log(`server started at port ${PORT}`))