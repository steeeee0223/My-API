import { model, Schema, Model } from 'mongoose'

import { Job } from './jobs.schema'

interface IJob extends Job {}

interface IJobMethods {}

type IJobModel = Model<IJob, {}, IJobMethods>

export const JobSchema = new Schema<IJob, IJobModel, IJobMethods>(
    {
        company: {
            type: String,
            required: [true, 'Please provide company name'],
            maxlength: 50,
        },
        position: {
            type: String,
            required: [true, 'Please provide position'],
            maxlength: 100,
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending',
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
)

export const JobModel = model<IJob, IJobModel>('Job', JobSchema)
