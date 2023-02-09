import { Types } from 'mongoose'

import { ResponseJSON } from '../../schemas'
import { Job, JobCreateParams, Jobs } from './jobs.schema'

const sampleJob = {
    company: 'string',
    position: 'string',
    status: 'string',
    createdBy: new Types.ObjectId(),
}

export class JobsService {
    public getAllJobs(): Jobs {
        return {
            jobs: [sampleJob],
            count: 1,
        }
    }

    public getJob(jobId: Types.ObjectId): Job {
        return sampleJob
    }

    public createJob(params: JobCreateParams): Job {
        return sampleJob
    }
    public updateJob(jobId: Types.ObjectId): Job {
        return sampleJob
    }

    public deleteJob(jobId: Types.ObjectId): ResponseJSON {
        return { message: 'Deleted' }
    }
}
