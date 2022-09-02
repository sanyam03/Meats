import { authenticateRequest, AuthRole } from "@core/auth"
import { createProductBrandV1 } from "@domain/ProductBrand/createProductBrandV1"
import { serializeBrandV1 } from "@domain/ProductBrand/serializeProductBrandV1"
import { parseYupSchema } from "apis/validators"
import { HttpRestApi, sendCreatedResponse } from "http-rest-api"
import * as yup from "yup"

const bodySchema = yup
	.object({
		title: yup.string().trim().max(100).required(),
		description: yup.string().trim().max(1000),
	})
	.required()

export const apiProductBrandAddV1 = new HttpRestApi({
	method: "post",
	path: "/brand/add/v1",
	handler: async ({ req }) => {
		authenticateRequest(req, [AuthRole.ADMIN])
		const body = await parseYupSchema(bodySchema, req.body)
		const brand = await createProductBrandV1({ ...body })
		return sendCreatedResponse(serializeBrandV1(brand, AuthRole.ADMIN))
	},
})
