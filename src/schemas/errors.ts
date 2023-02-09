import { StatusCodes } from 'http-status-codes'

export abstract class CustomAPIError {
    public message!: string
    public statusCode!: number
}

export class BadRequestError implements CustomAPIError {
    public statusCode = StatusCodes.BAD_REQUEST
    constructor(public message: string) {}
}
export class NotFoundError implements CustomAPIError {
    public statusCode = StatusCodes.NOT_FOUND
    constructor(public message: string) {}
}
export class UnauthenticatedError implements CustomAPIError {
    public statusCode = StatusCodes.UNAUTHORIZED
    constructor(public message: string) {}
}
export class ValidationError implements CustomAPIError {
    public statusCode = StatusCodes.UNPROCESSABLE_ENTITY
    constructor(public message: string) {}
}
export class InternalServerError implements CustomAPIError {
    public statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    constructor(public message: string) {}
}
export class CustomError implements CustomAPIError {
    constructor(
        public message: string = 'Something went wrong try again later',
        public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
    ) {}
}
