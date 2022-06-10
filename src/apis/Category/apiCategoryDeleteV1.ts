import { authenticateRequest, AuthRole } from "@core/auth"
import { CategoryId } from "@domain/Category/Category.entity"
import { deleteCategoryV1 } from "@domain/Category/deleteCategoryV1"
import { parseYupSchema } from "apis/validators"
import { HttpRestApi } from "http-rest-api"
import * as yup from "yup"

const bodySchema = yup.object({ id: yup.string().uuid().required() }).required()

export const apiCategoryDeleteV1 = new HttpRestApi({
	method: "post",
	path: "/category/delete/v1",
	handler: async ({ req }) => {
		authenticateRequest(req, [AuthRole.ADMIN])
		const body = await parseYupSchema(bodySchema, req.body)

		const id = body.id as CategoryId
		await deleteCategoryV1({ id })
	},
})
