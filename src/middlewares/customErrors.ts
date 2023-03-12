import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export function notFoundHandler(_req: Request, res: Response) {
    res.status(StatusCodes.NOT_FOUND).send({
        message: 'Route Not Found',
    })
}
