/**
 * The Auth object contains information of current user's access token
 */
export interface Auth {
    user: {
        /**
         * @example "Jane Doe"
         */
        name: string
    }
    /**
     * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2U1MThiZmM3MTAwZDRmNjZkMjg0ZDAiLCJuYW1lIjoiSmFuZSBEb2UiLCJpYXQiOjE2NzYwODM2MDUsImV4cCI6MTY3ODY3NTYwNX0.jVEUTnXGUDgnPnJCTKgSO60jjE5q04UbgXFPZoEiJag"
     */
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
