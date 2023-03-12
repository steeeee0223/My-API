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
    Res,
    TsoaResponse,
} from 'tsoa'
import { StatusCodes } from 'http-status-codes'
import { Request as ExRequest } from 'express'

import { ResponseJSON } from '../../schemas'
import { Auth, LoginParams, RegisterParams } from './auth.schema'
import { AuthService } from './auth.service'

@Tags('Authentication')
@Route('auth')
export class AuthController extends Controller {
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
    public async register(
        @Body() body: RegisterParams,
        @Res() res: TsoaResponse<201, Auth>
    ): Promise<Auth> {
        return new AuthService().register(body, res)
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
    public async login(
        @Body() body: LoginParams,
        @Res() res: TsoaResponse<200, Auth>
    ): Promise<Auth> {
        return await new AuthService().login(body, res)
    }

    /**
     * @summary Refresh access token for a user
     */
    @SuccessResponse(StatusCodes.OK, 'Token Refreshed')
    @Response<ResponseJSON>(StatusCodes.UNAUTHORIZED, 'Refresh fails')
    @Get('refresh')
    public async refresh(
        @Request() req: ExRequest,
        @Res() res: TsoaResponse<200, Auth>
    ): Promise<Auth> {
        return await new AuthService().refresh(req, res)
    }

    /**
     * @summary Logs out a user
     */
    @SuccessResponse(StatusCodes.OK, 'Logged Out')
    @Get('logout')
    public async logout(
        @Request() req: ExRequest,
        @Res() res: TsoaResponse<204, void>
    ): Promise<void> {
        return await new AuthService().logout(req, res)
    }
}
