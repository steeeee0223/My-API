import { v4 } from 'uuid'

import { User } from './user.schema'
import { UUID } from '../common/schemas'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>

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
            // id: Math.floor(Math.random() * 10000), // Random
            id: uuid,
            status: 'Happy',
            ...userCreationParams,
        }
    }
}
