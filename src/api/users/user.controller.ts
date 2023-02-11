import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Response,
    Example,
    Tags,
} from 'tsoa'

import { ValidateErrorJSON, UUID } from '../../schemas'
import { User, UserCreationParams } from './user.schema'
import { UsersService } from './user.service'

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    /**
     * Retrieves the details of an existing user.
     * Supply the unique user ID from either and receive corresponding user details.
     * @param userId The user's identifier
     * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
     * @param name Provide a username to display
     * @summary Gets a user
     */
    @Example<User>({
        id: '52907745-7672-470e-a803-a2f8feb52944',
        name: 'tsoa user',
        email: 'hello@tsoa.com',
        phoneNumbers: [],
        status: 'Happy',
    })
    @Get('{userId}')
    public async getUser(
        @Path() userId: UUID,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(userId, name)
    }

    /**
     *
     * @param requestBody The information to sign up a user
     * @summary Creates a user
     */
    @SuccessResponse('201', 'Created') // Custom success response
    @Response<ValidateErrorJSON>(422, 'Validation Failed', {
        message: 'Validation failed',
        details: {
            requestBody: {
                message: 'id is an excess property and therefore not allowed',
                value: '52907745-7672-470e-a803-a2f8feb52944',
            },
        },
    })
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<User> {
        this.setStatus(201) // set return status 201
        const user = new UsersService().create(requestBody)
        return user
    }
}
