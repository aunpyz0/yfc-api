import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import supporterRouter from './handler/supporter'
// import statusRouter from './handler/status'
// import staffRouter from './handler/staff'
// import bankRouter from './handler/bank'
// import giveRouter from './handler/give'
// import loginRouter from './handler/login'
// import logoutRouter from './handler/logout'
// import refreshRouter from './handler/refresh'
// import yfcBankRouter from './handler/yfcbank'
// import roleRouter from './handler/role'

dotenv.config()

export const PORT = process.env.PORT || 8080
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

const app: Application = express()

app.use(helmet())
app.use(cors({
    origin: CORS_ORIGIN
}))
app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/evidence', express.static('uploads'))

// app.use(statusRouter())
// app.use(loginRouter())
// app.use(refreshRouter())
// app.use(logoutRouter())
// app.use(staffRouter())
app.use(supporterRouter())
// app.use(bankRouter())
// app.use(giveRouter())
// app.use(yfcBankRouter())
// app.use(roleRouter())

app.use((err: Error, req: Request , res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send(err.message)
})

export default app
