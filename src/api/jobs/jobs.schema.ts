import { Types } from 'mongoose'

export interface JobCreateParams {
    /**
     * @example "Apple"
     */
    company: string
    /**
     * @example "Software Engineer"
     */
    position: string
    /**
     * @example "pending"
     */
    status: string
}
/**
 * The Job object contains information of a job created by a user
 */
export interface Job extends JobCreateParams {
    /**
     * @pattern [0-9a-fA-F]{24}
     * @example 551137c2f9e1fac808a5f572
     */
    createdBy: Types.ObjectId
}

export interface Jobs {
    jobs: Job[]
    count: number
}
