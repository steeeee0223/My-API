/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
    Controller,
    ValidationService,
    FieldErrors,
    ValidateError,
    TsoaRoute,
    HttpStatusCodeLiteral,
    TsoaResponse,
    fetchMiddlewares,
} from '@tsoa/runtime'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../src/api/auth/auth.controller'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { JobsController } from './../src/api/jobs/jobs.controller'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../src/api/users/user.controller'
import type { RequestHandler } from 'express'
import * as express from 'express'

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    Auth: {
        dataType: 'refObject',
        properties: {
            user: {
                dataType: 'nestedObjectLiteral',
                nestedProperties: {
                    name: { dataType: 'string', required: true },
                },
                required: true,
            },
            token: { dataType: 'string', required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ResponseJSON: {
        dataType: 'refObject',
        properties: {
            message: { dataType: 'string', required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    LoginParams: {
        dataType: 'refAlias',
        type: {
            dataType: 'nestedObjectLiteral',
            nestedProperties: {
                password: { dataType: 'string', required: true },
                email: { dataType: 'string', required: true },
            },
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    RegisterParams: {
        dataType: 'refAlias',
        type: {
            dataType: 'intersection',
            subSchemas: [
                { ref: 'LoginParams' },
                {
                    dataType: 'nestedObjectLiteral',
                    nestedProperties: {
                        name: { dataType: 'string', required: true },
                    },
                },
            ],
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Types.ObjectId': {
        dataType: 'refAlias',
        type: { dataType: 'string', validators: {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    Job: {
        dataType: 'refObject',
        properties: {
            company: { dataType: 'string', required: true },
            position: { dataType: 'string', required: true },
            status: { dataType: 'string', required: true },
            createdBy: {
                ref: 'Types.ObjectId',
                required: true,
                validators: { pattern: { value: '[0-9a-fA-F]{24}' } },
            },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    Jobs: {
        dataType: 'refObject',
        properties: {
            jobs: {
                dataType: 'array',
                array: { dataType: 'refObject', ref: 'Job' },
                required: true,
            },
            count: { dataType: 'double', required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ValidateErrorJSON: {
        dataType: 'refObject',
        properties: {
            message: {
                dataType: 'enum',
                enums: ['Validation failed'],
                required: true,
            },
            details: {
                dataType: 'nestedObjectLiteral',
                nestedProperties: {},
                additionalProperties: { dataType: 'any' },
                required: true,
            },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    JobCreateParams: {
        dataType: 'refObject',
        properties: {
            company: { dataType: 'string', required: true },
            position: { dataType: 'string', required: true },
            status: { dataType: 'string', required: true },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    UUID: {
        dataType: 'refAlias',
        type: {
            dataType: 'string',
            validators: {
                pattern: {
                    value: '[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}',
                },
            },
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    User: {
        dataType: 'refObject',
        properties: {
            id: { ref: 'UUID', required: true },
            email: { dataType: 'string', required: true },
            name: { dataType: 'string', required: true },
            status: {
                dataType: 'union',
                subSchemas: [
                    { dataType: 'enum', enums: ['Happy'] },
                    { dataType: 'enum', enums: ['Sad'] },
                ],
            },
            phoneNumbers: {
                dataType: 'array',
                array: { dataType: 'string' },
                required: true,
            },
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    'Pick_User.email-or-name-or-phoneNumbers_': {
        dataType: 'refAlias',
        type: {
            dataType: 'nestedObjectLiteral',
            nestedProperties: {
                email: { dataType: 'string', required: true },
                name: { dataType: 'string', required: true },
                phoneNumbers: {
                    dataType: 'array',
                    array: { dataType: 'string' },
                    required: true,
                },
            },
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    UserCreationParams: {
        dataType: 'refAlias',
        type: {
            ref: 'Pick_User.email-or-name-or-phoneNumbers_',
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
const validationService = new ValidationService(models)

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post(
        '/auth/register',
        ...fetchMiddlewares<RequestHandler>(AuthController),
        ...fetchMiddlewares<RequestHandler>(AuthController.prototype.register),

        function AuthController_register(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                body: {
                    in: 'body',
                    name: 'body',
                    required: true,
                    ref: 'RegisterParams',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new AuthController()

                const promise = controller.register.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 201, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post(
        '/auth/login',
        ...fetchMiddlewares<RequestHandler>(AuthController),
        ...fetchMiddlewares<RequestHandler>(AuthController.prototype.login),

        function AuthController_login(request: any, response: any, next: any) {
            const args = {
                body: {
                    in: 'body',
                    name: 'body',
                    required: true,
                    ref: 'LoginParams',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new AuthController()

                const promise = controller.login.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 200, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        '/jobs',
        ...fetchMiddlewares<RequestHandler>(JobsController),
        ...fetchMiddlewares<RequestHandler>(
            JobsController.prototype.getAllJobs
        ),

        function JobsController_getAllJobs(
            request: any,
            response: any,
            next: any
        ) {
            const args = {}

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new JobsController()

                const promise = controller.getAllJobs.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 200, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        '/jobs/:jobId',
        ...fetchMiddlewares<RequestHandler>(JobsController),
        ...fetchMiddlewares<RequestHandler>(JobsController.prototype.getJob),

        function JobsController_getJob(request: any, response: any, next: any) {
            const args = {
                jobId: {
                    in: 'path',
                    name: 'jobId',
                    required: true,
                    ref: 'Types.ObjectId',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new JobsController()

                const promise = controller.getJob.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 200, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post(
        '/jobs',
        ...fetchMiddlewares<RequestHandler>(JobsController),
        ...fetchMiddlewares<RequestHandler>(JobsController.prototype.createJob),

        function JobsController_createJob(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                body: {
                    in: 'body',
                    name: 'body',
                    required: true,
                    ref: 'JobCreateParams',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new JobsController()

                const promise = controller.createJob.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 200, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.patch(
        '/jobs/:jobId',
        ...fetchMiddlewares<RequestHandler>(JobsController),
        ...fetchMiddlewares<RequestHandler>(JobsController.prototype.updateJob),

        function JobsController_updateJob(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                jobId: {
                    in: 'path',
                    name: 'jobId',
                    required: true,
                    ref: 'Types.ObjectId',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new JobsController()

                const promise = controller.updateJob.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 200, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete(
        '/jobs/:jobId',
        ...fetchMiddlewares<RequestHandler>(JobsController),
        ...fetchMiddlewares<RequestHandler>(JobsController.prototype.deleteJob),

        function JobsController_deleteJob(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                jobId: {
                    in: 'path',
                    name: 'jobId',
                    required: true,
                    ref: 'Types.ObjectId',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new JobsController()

                const promise = controller.deleteJob.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 204, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get(
        '/users/:userId',
        ...fetchMiddlewares<RequestHandler>(UsersController),
        ...fetchMiddlewares<RequestHandler>(UsersController.prototype.getUser),

        function UsersController_getUser(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                userId: {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    ref: 'UUID',
                },
                name: { in: 'query', name: 'name', dataType: 'string' },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new UsersController()

                const promise = controller.getUser.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, undefined, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post(
        '/users',
        ...fetchMiddlewares<RequestHandler>(UsersController),
        ...fetchMiddlewares<RequestHandler>(
            UsersController.prototype.createUser
        ),

        function UsersController_createUser(
            request: any,
            response: any,
            next: any
        ) {
            const args = {
                requestBody: {
                    in: 'body',
                    name: 'requestBody',
                    required: true,
                    ref: 'UserCreationParams',
                },
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = getValidatedArgs(args, request, response)

                const controller = new UsersController()

                const promise = controller.createUser.apply(
                    controller,
                    validatedArgs as any
                )
                promiseHandler(controller, promise, response, 201, next)
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return (
            'getHeaders' in object &&
            'getStatus' in object &&
            'setStatus' in object
        )
    }

    function promiseHandler(
        controllerObj: any,
        promise: any,
        response: any,
        successStatus: any,
        next: any
    ) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus
                let headers
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders()
                    statusCode = controllerObj.getStatus() || statusCode
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error))
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(
        response: any,
        statusCode?: number,
        data?: any,
        headers: any = {}
    ) {
        if (response.headersSent) {
            return
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name])
        })
        if (
            data &&
            typeof data.pipe === 'function' &&
            data.readable &&
            typeof data._read === 'function'
        ) {
            response.status(statusCode || 200)
            data.pipe(response)
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data)
        } else {
            response.status(statusCode || 204).end()
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(
        response: any
    ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers)
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors = {}
        const values = Object.keys(args).map((key) => {
            const name = args[key].name
            switch (args[key].in) {
                case 'request':
                    return request
                case 'query':
                    return validationService.ValidateParam(
                        args[key],
                        request.query[name],
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: 'throw-on-extras' }
                    )
                case 'queries':
                    return validationService.ValidateParam(
                        args[key],
                        request.query,
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: 'throw-on-extras' }
                    )
                case 'path':
                    return validationService.ValidateParam(
                        args[key],
                        request.params[name],
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: 'throw-on-extras' }
                    )
                case 'header':
                    return validationService.ValidateParam(
                        args[key],
                        request.header(name),
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: 'throw-on-extras' }
                    )
                case 'body':
                    return validationService.ValidateParam(
                        args[key],
                        request.body,
                        name,
                        fieldErrors,
                        undefined,
                        { noImplicitAdditionalProperties: 'throw-on-extras' }
                    )
                case 'body-prop':
                    return validationService.ValidateParam(
                        args[key],
                        request.body[name],
                        name,
                        fieldErrors,
                        'body.',
                        { noImplicitAdditionalProperties: 'throw-on-extras' }
                    )
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(
                            args[key],
                            request.file,
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    'throw-on-extras',
                            }
                        )
                    } else if (
                        args[key].dataType === 'array' &&
                        args[key].array.dataType === 'file'
                    ) {
                        return validationService.ValidateParam(
                            args[key],
                            request.files,
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    'throw-on-extras',
                            }
                        )
                    } else {
                        return validationService.ValidateParam(
                            args[key],
                            request.body[name],
                            name,
                            fieldErrors,
                            undefined,
                            {
                                noImplicitAdditionalProperties:
                                    'throw-on-extras',
                            }
                        )
                    }
                case 'res':
                    return responder(response)
            }
        })

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '')
        }
        return values
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
