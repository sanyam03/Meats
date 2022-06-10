import { authenticateRequest, AuthRole } from "@core/auth"
import { CategoryId } from "@domain/Category/Category.entity"
import { serializeCategoryV1 } from "@domain/Category/serializeCategoryV1"
import { updateCategoryParentCategoryV1 } from "@domain/Category/updateCategoryParentCategoryV1"
import { parseYupSchema } from "apis/validators"
import { HttpRestApi } from "http-rest-api"
import * as yup from "yup"

const bodySchema = yup.object({
	id: yup.string().uuid().required(),
	parentCategoryId: yup.string().uuid().nullable().default(null),
})

export const apiCategoryUpdateParentCategoryV1 = new HttpRestApi({
	method: "post",
	path: "/category/parentCategory/update/v1",
	handler: async ({ req }) => {
		authenticateRequest(req, [AuthRole.ADMIN])
		const body = await parseYupSchema(bodySchema, req.body)
		const id = body.id as CategoryId
		const parentCategoryId = body.parentCategoryId as CategoryId

		const category = await updateCategoryParentCategoryV1({
			id,
			parentCategoryId,
		})
		return serializeCategoryV1(category, AuthRole.ADMIN)
	},
})
