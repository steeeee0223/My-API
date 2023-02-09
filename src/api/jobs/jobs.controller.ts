import { Types } from 'mongoose'
import {
    Body,
    Controller,
    Post,
    Route,
    SuccessResponse,
    Response,
    Tags,
    Get,
    Path,
    Patch,
    Delete,
} from 'tsoa'

import { ResponseJSON, ValidateErrorJSON } from '../../schemas'
import { Job, JobCreateParams, Jobs } from './jobs.schema'
import { JobsService } from './jobs.service'

@Tags('Jobs')
@Route('jobs')
export class JobsController extends Controller {
    /**
     * Gets all jobs
     */
    @SuccessResponse('200', 'OK')
    @Get()
    public async getAllJobs(): Promise<Jobs> {
        this.setStatus(200)
        return new JobsService().getAllJobs()
    }
    /**
     * Gets a job by id
     */
    @SuccessResponse('200', 'OK')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Get('{jobId}')
    public async getJob(@Path() jobId: Types.ObjectId): Promise<Job> {
        this.setStatus(200)
        return new JobsService().getJob(jobId)
    }

    /**
     * Creates a job
     */
    @SuccessResponse('200', 'OK')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Post()
    public async createJob(@Body() body: JobCreateParams): Promise<Job> {
        this.setStatus(200)
        return new JobsService().createJob(body)
    }

    /**
     * Updates a job by id
     */
    @SuccessResponse('200', 'OK')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Patch('{jobId}')
    public async updateJob(@Path() jobId: Types.ObjectId): Promise<Job> {
        this.setStatus(200)
        return new JobsService().updateJob(jobId)
    }
    /**
     * Deletes a job by id
     */
    @SuccessResponse('204', 'No content')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Delete('{jobId}')
    public async deleteJob(
        @Path() jobId: Types.ObjectId
    ): Promise<ResponseJSON> {
        this.setStatus(204)
        return new JobsService().deleteJob(jobId)
    }
}