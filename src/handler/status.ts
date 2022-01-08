import express, { NextFunction, Request, Response, Router } from 'express'

export default function(): Router {
    const router = express.Router()

    router.get('/status', (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(200)
    })

    return router
}