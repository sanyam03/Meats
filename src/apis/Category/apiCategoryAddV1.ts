import { authenticateRequest, AuthRole } from "@core/auth"
import { CategoryId } from "@domain/Category/Category.entity"
import { createCategoryV1 } from "@domain/Category/createCategoryV1"
import { serializeCategoryV1 } from "@domain/Category/serializeCategoryV1"
import { parseYupSchema } from "apis/validators"
import { HttpRestApi, sendCreatedResponse } from "http-rest-api"
import * as yup from "yup"

const bodySchema = yup
	.object({
		title: yup.string().trim().max(100).required(),
		description: yup.string().trim().max(1000),
		parentCategoryId: yup.string().uuid().nullable(),
	})
	.required()

export const apiCategoryAddV1 = new HttpRestApi({
	method: "post",
	path: "/category/add/v1",
	handler: async ({ req }) => {
		authenticateRequest(req, [AuthRole.ADMIN])
		const body = await parseYupSchema(bodySchema, req.body)
		const parentCategoryId = body.parentCategoryId as CategoryId | null | undefined

		const category = await createCategoryV1({ ...body, parentCategoryId })
		return sendCreatedResponse(serializeCategoryV1(category, AuthRole.ADMIN))
	},
})
