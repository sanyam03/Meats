import { BadRequestError } from "http-rest-api"
import * as yup from "yup"

export async function parseYupSchema<T extends yup.AnySchema>(schema: T, data: any) {
	try {
		return await schema.validate(data, { stripUnknown: true })
	} catch (err) {
		if (err instanceof yup.ValidationError) throw new BadRequestError(err.message)
		throw err
	}
}
