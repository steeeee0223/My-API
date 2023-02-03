import { UUID } from '../../schemas'

/**
 * User objects allow you to associate actions performed in the system with the user that performed them.
 * The User object contains common information across every user in the system regardless of status and role.
 *
 *
 * @example {
 *  "id": "52907745-7672-470e-a803-a2f8feb52944",
 *  "name": "John Doe",
 *  "phoneNumbers": []
 * }
 */
export interface User {
    id: UUID
    email: string
    name: string
    status?: 'Happy' | 'Sad'
    phoneNumbers: string[]
}

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>