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
    OperationId,
} from 'tsoa'
import { StatusCodes } from 'http-status-codes'
import { Request as ExRequest } from 'express'

import { ResponseJSON } from '../../schemas'
import { Auth, LoginParams, RegisterParams } from './auth.schema'
import { CAuthService } from './cauth.service'

@Tags('Authentication by Cookie')
@Route('cookie-auth')
export class CAuthController extends Controller {
    /**
     * @summary Registers a new user.
     */
    @OperationId('c-register')
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
        return new CAuthService().register(body, res)
    }

    /**
     * @summary Logs in a user.
     */
    @OperationId('c-login')
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
        return await new CAuthService().login(body, res)
    }

    /**
     * @summary Refresh access token for a user
     */
    @OperationId('c-refresh')
    @SuccessResponse(StatusCodes.OK, 'Token Refreshed')
    @Response<ResponseJSON>(StatusCodes.UNAUTHORIZED, 'Refresh fails')
    @Get('refresh')
    public async refresh(
        @Request() req: ExRequest,
        @Res() res: TsoaResponse<200, Auth>
    ): Promise<Auth> {
        return await new CAuthService().refresh(req, res)
    }

    /**
     * @summary Logs out a user
     */
    @OperationId('c-logout')
    @SuccessResponse(StatusCodes.OK, 'Logged Out')
    @Get('logout')
    public async logout(
        @Request() req: ExRequest,
        @Res() res: TsoaResponse<204, void>
    ): Promise<void> {
        return await new CAuthService().logout(req, res)
    }
}
