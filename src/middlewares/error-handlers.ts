import { ErrorRequestHandler } from 'express'

import {
    BadRequestError,
    CustomAPIError,
    CustomError,
    InternalServerError,
    NotFoundError,
    ValidationError,
} from '../schemas/'
import { logger } from '../utils'

function generateCustomError(err: any): CustomAPIError {
    const { name, code, message, errors, value, keyValue, statusCode, fields } =
        err
    switch (true) {
        case name === 'ValidateError':
            return new ValidationError(fields)
        case name === 'ValidationError':
            return new ValidationError(
                Object.values(errors)
                    .map((item: any) => item.message)
                    .join(',')
            )
        case code && code === 11000:
            return new BadRequestError(
                `Duplicate value entered for ${Object.keys(
                    keyValue
                )} field, please choose another value`
            )
        case name === 'CastError':
            return new NotFoundError(`No item with id: ${value} is found`)
        default:
            return new CustomError(message, statusCode)
    }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const { statusCode, message } = generateCustomError(err)
    logger.error(`** ${statusCode} ** ${message}`)
    return res.status(statusCode).json({ message })
}
