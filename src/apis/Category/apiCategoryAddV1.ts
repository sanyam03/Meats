import { AuthRole } from "@core/auth"
import { createdResponse, HttpApi } from "@core/http"
import { CategoryId } from "@domain/Category/Category.entity"
import { createCategoryV1 } from "@domain/Category/createCategoryV1"
import { serializeCategoryV1 } from "@domain/Category/serializeCategoryV1"
import { parseYupSchema } from "apis/validators"
import * as yup from "yup"

const bodySchema = yup
	.object({
		title: yup.string().trim().max(100).required(),
		description: yup.string().trim().max(1000),
		parentCategoryId: yup.string().uuid().nullable(),
	})
	.required()

export const apiCategoryAddV1 = new HttpApi({
	endpoint: "/category/add/v1",
	handler: async ({ req }) => {
		const body = await parseYupSchema(bodySchema, req.body)
		const parentCategoryId = body.parentCategoryId as CategoryId | null | undefined
		const category = await createCategoryV1({ ...body, parentCategoryId })
		return createdResponse(serializeCategoryV1(category, AuthRole.ADMIN))
	},
})
