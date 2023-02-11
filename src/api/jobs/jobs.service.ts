import { Types } from 'mongoose'

import { ResponseJSON } from '../../schemas'
import { Job, JobCreateParams, Jobs } from './jobs.schema'
import { JobModel } from './jobs.model'

const sampleJob = {
    company: 'string',
    position: 'string',
    status: 'string',
    createdBy: new Types.ObjectId(),
}

export class JobsService {
    public async getAllJobs(): Promise<Jobs> {
        const jobs = await JobModel.find({
            createdBy: new Types.ObjectId(),
            // createdBy: req.user?.userId
        }).sort('createdAt')
        return { jobs, count: jobs.length }
    }

    public async getJob(jobId: Types.ObjectId): Promise<Job> {
        return sampleJob
    }

    public async createJob(params: JobCreateParams): Promise<Job> {
        return sampleJob
    }
    public async updateJob(jobId: Types.ObjectId): Promise<Job> {
        return sampleJob
    }

    public async deleteJob(jobId: Types.ObjectId): Promise<ResponseJSON> {
        return { message: 'Deleted' }
    }
}
