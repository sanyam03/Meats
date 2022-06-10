import { AuthRole, createAuthTokens } from "@core/auth"
import { HttpRestApi, UnprocessableEntityError } from "http-rest-api"
import { listAdminV1 } from "@domain/Admin/listAdminV1"
import { parseYupSchema } from "apis/validators"
import * as yup from "yup"

const bodySchema = yup
	.object({
		username: yup
			.string()
			.trim()
			.required()
			.transform((str: string) => str.toLowerCase()),
		password: yup.string().required(),
	})
	.required()

export const apiAdminLoginV1 = new HttpRestApi({
	method: "post",
	path: "/admin/login/v1",
	handler: async ({ req }) => {
		const { username, password } = await parseYupSchema(bodySchema, req.body)

		const [[admin]] = await listAdminV1({ filter: { username } })
		if (!admin) {
			throw new UnprocessableEntityError("Incorrect username or password")
		}

		const isPasswordValid = await admin.validatePassword(password)
		if (!isPasswordValid) {
			throw new UnprocessableEntityError("Incorrect username or password")
		}

		return createAuthTokens({ role: AuthRole.ADMIN, id: admin.id })
	},
})
