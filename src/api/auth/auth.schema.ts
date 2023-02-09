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

export type LoginParams = {
    /**
     * @example "janedoe@example.com"
     */
    email: string
    /**
     * @example "secret"
     */
    password: string
}

export type RegisterParams = LoginParams & {
    /**
     * @example "Jane Doe"
     */
    name: string
}

export type UserInfo = {
    userId: string // UUID
    name: string
}
