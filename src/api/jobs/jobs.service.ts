import { Types } from 'mongoose'

import { BadRequestError, NotFoundError, ResponseJSON } from '../../schemas'
import { Job, JobCreateParams, Jobs, JobUpdateParams } from './jobs.schema'
import { JobModel } from './jobs.model'

export class JobsService {
    public async getAllJobs(): Promise<Jobs> {
        const jobs = await JobModel.find({
            createdBy: new Types.ObjectId(),
            // createdBy: req.user?.userId
        }).sort('createdAt')
        return { jobs, count: jobs.length }
    }

    public async getJob(jobId: Types.ObjectId): Promise<Job> {
        const job = await JobModel.findOne({
            _id: jobId,
            // createdBy: user?.userId,
        })
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId} is found!`)
        }
        return job
    }

    public async createJob(params: JobCreateParams): Promise<Job> {
        // req.body.createdBy = new Types.ObjectId(req.user?.userId ?? ('' as never))
        const job = await JobModel.create({
            ...params,
            createdBy: new Types.ObjectId(),
        })
        return job
    }

    public async updateJob(
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
                // createdBy: user?.userId
            },
            params,
            { new: true, runValidators: true }
        )
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId} is found!`)
        }
        return job
    }

    public async deleteJob(jobId: Types.ObjectId): Promise<ResponseJSON> {
        const job = await JobModel.findByIdAndRemove({
            _id: jobId,
            // createdBy: user?.userId,
        })
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId} is found!`)
        }
        return { message: `Job with id ${jobId} has been deleted!` }
    }
}
