import express, { Application, Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import dotenv from 'dotenv'
import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'
import staffRouter from './handler/staff'
import supporterRouter from './handler/supporter'
import bankRouter from './handler/bank'
import giveRouter from './handler/give'
import loginRouter from './handler/login'
import logoutRouter from './handler/logout'
import refreshRouter from './handler/refresh'
import yfcBankRouter from './handler/yfcbank'
import roleRouter from './handler/role'

dotenv.config()

export const PORT = process.env.PORT || 8080
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

const app: Application = express()
const prisma = new PrismaClient()

app.use(helmet())
app.use(cors({
    origin: CORS_ORIGIN
}))
app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/evidence', express.static('uploads'))

app.use(loginRouter(prisma))
app.use(refreshRouter(prisma))
app.use(logoutRouter(prisma))
app.use(staffRouter(prisma))
app.use(supporterRouter(prisma))
app.use(bankRouter(prisma))
app.use(giveRouter(prisma))
app.use(yfcBankRouter(prisma))
app.use(roleRouter(prisma))

app.use((err: Error, req: Request , res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send(err.message)
})

export default app
