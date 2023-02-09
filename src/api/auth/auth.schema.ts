/**
 * The Auth object contains information of current user's access token
 * @example {
 *  "user": {
 *      "name": "Jane Doe",
 *  },
 * "token": "json-web-token"
 * }
 */
export interface Auth {
    user: { name: string }
    token: string
}

export type RegisterParams = {
    name: string
    email: string
    password: string
}

export type LoginParams = {
    userId: string // UUID
    name: string
}
