import { authenticateRequest, AuthRole } from "@core/auth"
import { CategoryId } from "@domain/Category/Category.entity"
import { serializeCategoryV1 } from "@domain/Category/serializeCategoryV1"
import { updateCategoryV1 } from "@domain/Category/updateCategoryV1"
import { parseYupSchema } from "apis/validators"
import { HttpRestApi } from "http-rest-api"
import * as yup from "yup"

const bodySchema = yup.object({
	filter: yup.object({ id: yup.string().uuid().required() }).required(),
	update: yup.object({
		title: yup.string().trim().max(100),
		description: yup.string().trim().max(1000),
	}),
})

export const apiCategoryUpdateV1 = new HttpRestApi({
	method: "post",
	path: "/category/update/v1",
	handler: async ({ req }) => {
		authenticateRequest(req, [AuthRole.ADMIN])
		const body = await parseYupSchema(bodySchema, req.body)
		const id = body.filter.id as CategoryId

		const category = await updateCategoryV1({ filter: { id }, update: body.update })
		return serializeCategoryV1(category, AuthRole.ADMIN)
	},
})
