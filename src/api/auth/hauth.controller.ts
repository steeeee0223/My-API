import {
    Body,
    Controller,
    Post,
    Route,
    SuccessResponse,
    Response,
    Tags,
    Get,
    Request,
} from 'tsoa'
import { StatusCodes } from 'http-status-codes'
import { Request as ExRequest } from 'express'

import { ResponseJSON } from '../../schemas'
import { Auth, LoginParams, RegisterParams } from './auth.schema'
import { HAuthService } from './hauth.service'

@Tags('Authentication by Header')
@Route('header-auth')
export class HAuthController extends Controller {
    /**
     * @summary Registers a new user.
     */
    @SuccessResponse(StatusCodes.CREATED, 'Registered')
    @Response<ResponseJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Response<ResponseJSON>(StatusCodes.BAD_REQUEST, 'Bad Request')
    @Post('register')
    public async register(@Body() body: RegisterParams): Promise<Auth> {
        const res = await new HAuthService().register(body)
        this.setStatus(StatusCodes.CREATED)
        this.setHeader('Authorization', `Bearer ${res.token}`)
        return res
    }

    /**
     * @summary Logs in a user.
     */
    @SuccessResponse(StatusCodes.OK, 'Logged In')
    @Response<ResponseJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Response<ResponseJSON>(StatusCodes.BAD_REQUEST, 'Bad Request')
    @Response<ResponseJSON>(StatusCodes.UNAUTHORIZED, 'Invalid Credentials')
    @Post('login')
    public async login(@Body() body: LoginParams): Promise<Auth> {
        const res = await new HAuthService().login(body)
        this.setStatus(StatusCodes.CREATED)
        this.setHeader('Authorization', `Bearer ${res.token}`)
        return res
    }

    /**
     * @summary Refresh access token for a user
     */
    @SuccessResponse(StatusCodes.OK, 'Token Refreshed')
    @Response<ResponseJSON>(StatusCodes.UNAUTHORIZED, 'Refresh fails')
    @Get('refresh')
    public async refresh(@Request() req: ExRequest): Promise<Auth> {
        const res = await new HAuthService().refresh(req)
        this.setStatus(StatusCodes.OK)
        this.setHeader('Authorization', `Bearer ${res.token}`)
        return res
    }

    /**
     * @summary Logs out a user
     */
    @SuccessResponse(StatusCodes.OK, 'Logged Out')
    @Get('logout')
    public async logout(@Request() req: ExRequest): Promise<void> {
        const res = await new HAuthService().logout(req)
        this.setStatus(StatusCodes.OK)
        this.setHeader('Authorization', '')
        return res
    }
}
