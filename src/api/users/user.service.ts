import { v4 } from 'uuid'

import { User, UserCreationParams } from './user.schema'
import { UUID } from '../../schemas'

export class UsersService {
    public get(id: UUID, name?: string): User {
        return {
            id,
            email: 'jane@doe.com',
            name: name ?? 'Jane Doe',
            status: 'Happy',
            phoneNumbers: [],
        }
    }

    public create(userCreationParams: UserCreationParams): User {
        const uuid = v4()
        return {
            id: uuid,
            status: 'Happy',
            ...userCreationParams,
        }
    }
}
