import { authenticateRequest, AuthRole } from "@core/auth"
import { HttpApi } from "@core/http"
import { listCategoryV1 } from "@domain/Category/listCategoryV1"
import { serializeCategoryListV1 } from "@domain/Category/serializeCategoryV1"

export const apiCategoryListV1 = new HttpApi({
	endpoint: "/category/list/v1",
	handler: async ({ req }) => {
		const allowedRoles = [AuthRole.ADMIN, AuthRole.GUEST, AuthRole.USER]
		const { role } = authenticateRequest(req, allowedRoles)

		const isPublished = role !== AuthRole.ADMIN
		const [list, count] = await listCategoryV1({ filter: { isPublished } })

		return { count, list: serializeCategoryListV1(list, role) }
	},
})
