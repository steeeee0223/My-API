import { Request as ExRequest, RequestHandler } from 'express'
import { Types } from 'mongoose'
import {
    Body,
    Controller,
    Post,
    Route,
    SuccessResponse,
    Request,
    Response,
    Tags,
    Get,
    Path,
    Patch,
    Delete,
    Middlewares,
    Header,
} from 'tsoa'
import { StatusCodes } from 'http-status-codes'

import { ResponseJSON, ValidateErrorJSON } from '../../schemas'
import { logger } from '../../utils'
import { Job, JobCreateParams, Jobs, JobUpdateParams } from './jobs.schema'
import { JobsService } from './jobs.service'
import { authMiddleware } from '../../middlewares'
import { UnauthenticatedErrorJSON } from '../../schemas/responses'

@Tags('Jobs')
@Middlewares<RequestHandler>(authMiddleware)
@Response<UnauthenticatedErrorJSON>(StatusCodes.UNAUTHORIZED, 'Unauthorized')
@Route('jobs')
export class JobsController extends Controller {
    /**
     * @summary Gets all jobs
     */
    @SuccessResponse(StatusCodes.OK, 'OK')
    @Get()
    public async getAllJobs(
        @Header('Authorization') bearerToken: string,
        @Request() req: ExRequest
    ): Promise<Jobs> {
        console.log(bearerToken)
        const user = await req.user
        logger.info(user.name)
        this.setStatus(StatusCodes.OK)
        return new JobsService().getAllJobs(user.userId)
    }

    /**
     * @summary Gets a job by id
     */
    @SuccessResponse(StatusCodes.OK, 'OK')
    @Response<ValidateErrorJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Get('{jobId}')
    public async getJob(
        @Request() req: ExRequest,
        @Path() jobId: Types.ObjectId
    ): Promise<Job> {
        const user = await req.user
        this.setStatus(StatusCodes.OK)
        return new JobsService().getJob(user.userId, jobId)
    }

    /**
     * @summary Creates a job
     */
    @SuccessResponse(StatusCodes.CREATED, 'CREATED')
    @Response<ValidateErrorJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Post()
    public async createJob(
        @Request() req: ExRequest,
        @Body() body: JobCreateParams
    ): Promise<Job> {
        const user = await req.user
        this.setStatus(StatusCodes.CREATED)
        return new JobsService().createJob(user.userId, body)
    }

    /**
     * @summary Updates a job by id
     */
    @SuccessResponse(StatusCodes.ACCEPTED, 'ACCEPTED')
    @Response<ValidateErrorJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Patch('{jobId}')
    public async updateJob(
        @Request() req: ExRequest,
        @Path() jobId: Types.ObjectId,
        @Body() body: JobUpdateParams
    ): Promise<Job> {
        const user = await req.user
        this.setStatus(StatusCodes.ACCEPTED)
        return new JobsService().updateJob(user.userId, jobId, body)
    }

    /**
     * @summary Deletes a job by id
     */
    @SuccessResponse(StatusCodes.NO_CONTENT, 'NO CONTENT')
    @Response<ValidateErrorJSON>(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Failed'
    )
    @Delete('{jobId}')
    public async deleteJob(
        @Request() req: ExRequest,
        @Path() jobId: Types.ObjectId
    ): Promise<ResponseJSON> {
        const user = await req.user
        this.setStatus(StatusCodes.NO_CONTENT)
        return new JobsService().deleteJob(user.userId, jobId)
    }
}
