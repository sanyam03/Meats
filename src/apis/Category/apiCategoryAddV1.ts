import { createdResponse, HttpApi } from "@core/http"
import { createCategoryV1 } from "@domain/Category/createCategoryV1"
import { parseYupSchema } from "apis/validators"
import * as yup from "yup"

const bodySchema = yup.object({ title: yup.string().trim().required() }).required()

export const apiCategoryAddV1 = new HttpApi({
	endpoint: "/category/add/v1",
	handler: async ({ req }) => {
		const { title } = await parseYupSchema(bodySchema, req.body)
		const category = await createCategoryV1({ title })
		return createdResponse(category)
	},
})
