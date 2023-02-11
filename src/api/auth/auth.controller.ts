import {
    Body,
    Controller,
    Post,
    Route,
    SuccessResponse,
    Response,
    Tags,
} from 'tsoa'
import { StatusCodes } from 'http-status-codes'

import { ResponseJSON } from '../../schemas'
import { Auth, LoginParams, RegisterParams } from './auth.schema'
import { AuthService } from './auth.service'

@Tags('Authentication')
@Route('auth')
export class AuthController extends Controller {
    /**
     * @summary Registers a new user.
     */
    @SuccessResponse('201', 'Registered')
    @Response<ResponseJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Response<ResponseJSON>(StatusCodes.BAD_REQUEST, 'Bad Request')
    @Post('register')
    public async register(@Body() body: RegisterParams): Promise<Auth> {
        this.setStatus(StatusCodes.CREATED)
        return new AuthService().register(body)
    }
    /**
     * @summary Logs in a user.
     */
    @SuccessResponse('200', 'Logged In')
    @Response<ResponseJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Response<ResponseJSON>(StatusCodes.BAD_REQUEST, 'Bad Request')
    @Response<ResponseJSON>(StatusCodes.UNAUTHORIZED, 'Invalid Credentials')
    @Post('login')
    public async login(@Body() body: LoginParams): Promise<Auth> {
        this.setStatus(StatusCodes.OK)
        return new AuthService().login(body)
    }
}
