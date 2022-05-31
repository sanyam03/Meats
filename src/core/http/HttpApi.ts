import { Request, RequestHandler, Response } from "express"
import { HttpMethod, HttpStatusCode } from "./types"
import { HttpError, isHttpError } from "./HttpError"
import { HttpResponse } from "./HttpResponse"

type Handler = (payload: { req: Request; res: Response }) => Promise<HttpResponse | any>

interface IHttpApiConstructorParameters {
	method?: HttpMethod
	endpoint: string
	options?: ApiOptions
	middlewares?: RequestHandler[]
	handler: Handler
}

interface ApiOptions {
	hideErrorStack?: boolean
}

export class HttpApi {
	method: HttpMethod
	endpoint: string
	options: ApiOptions
	middlewares: RequestHandler[]
	handler: Handler

	callApi: RequestHandler

	constructor(payload: IHttpApiConstructorParameters) {
		this.method = payload.method ?? "post"
		this.endpoint = payload.endpoint

		const isProduction = process.env.NODE_ENV === "production"
		const defaultOptions: ApiOptions = { hideErrorStack: isProduction }
		this.options = payload.options ?? defaultOptions

		this.handler = payload.handler
		this.middlewares = payload.middlewares ?? []

		this.callApi = async (req, res) => {
			try {
				if (res.headersSent) return
				const responseObject = await this.handler({ req, res })
				sendJsonResponse(res, responseObject)
			} catch (err) {
				sendErrorResponse(res, err)
			}
		}
	}
}

function sendJsonResponse(res: Response, responseObject: HttpResponse | any) {
	if (res.headersSent) return

	let data = undefined
	let statusCode = HttpStatusCode.NO_CONTENT

	if (responseObject instanceof HttpResponse) {
		statusCode = responseObject.httpStatusCode
		data = responseObject.data
	} else {
		data = responseObject
		statusCode = data ? HttpStatusCode.OK : HttpStatusCode.NO_CONTENT
	}

	res.status(statusCode).json(data)
}

function sendErrorResponse(
	res: Response,
	err: unknown,
	options: { hideErrorStack?: boolean } = {},
) {
	let data: { name: string; message: string; stack?: string } = {
		name: "InternalServerError",
		message: "Something went wrong",
	}
	let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR

	if (isHttpError(err)) {
		const httpError = err as HttpError

		statusCode = httpError.httpStatusCode
		data = {
			name: httpError.name,
			message: httpError.message,
			stack: (!options.hideErrorStack && httpError.stack) || undefined,
		}
	} else if (err instanceof Error) {
		data = {
			name: err.name,
			message: err.message,
			stack: (!options.hideErrorStack && err.stack) || undefined,
		}
	}

	res.status(statusCode).json(data)
}