import { Types } from 'mongoose'

import { BadRequestError, NotFoundError, ResponseJSON } from '../../schemas'
import { Job, JobCreateParams, Jobs, JobUpdateParams } from './jobs.schema'
import { JobModel } from './jobs.model'

export class JobsService {
    public async getAllJobs(userId: Types.ObjectId): Promise<Jobs> {
        const jobs = await JobModel.find({
            createdBy: userId,
        }).sort('createdAt')
        return { jobs, count: jobs.length }
    }

    public async getJob(
        userId: Types.ObjectId,
        jobId: Types.ObjectId
    ): Promise<Job> {
        const job = await JobModel.findOne({
            _id: jobId,
            createdBy: userId,
        })
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId} is found!`)
        }
        return job
    }

    public async createJob(
        userId: Types.ObjectId,
        params: JobCreateParams
    ): Promise<Job> {
        const job = await JobModel.create({
            ...params,
            createdBy: userId,
        })
        return job
    }

    public async updateJob(
        userId: Types.ObjectId,
        jobId: Types.ObjectId,
        params: JobUpdateParams
    ): Promise<Job> {
        const { company, position } = params
        if (company === '' || position === '') {
            throw new BadRequestError(
                'Company or Position fields cannot be empty!'
            )
        }
        const job = await JobModel.findByIdAndUpdate(
            {
                _id: jobId,
                createdBy: userId,
            },
            params,
            { new: true, runValidators: true }
        )
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId} is found!`)
        }
        return job
    }

    public async deleteJob(
        userId: Types.ObjectId,
        jobId: Types.ObjectId
    ): Promise<ResponseJSON> {
        const job = await JobModel.findByIdAndRemove({
            _id: jobId,
            createdBy: userId,
        })
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId} is found!`)
        }
        return { message: `Job with id ${jobId} has been deleted!` }
    }
}
