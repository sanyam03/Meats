import { authenticateRequest, AuthRole } from "@core/auth"
import { listProductBrandV1 } from "@domain/ProductBrand/listProductBrandV1"
import { serializeBrandListV1 } from "@domain/ProductBrand/serializeProductBrandV1"
import { HttpRestApi } from "http-rest-api"

export const apiProductBrandListV1 = new HttpRestApi({
	method: "post",
	path: "/brand/list/v1",
	handler: async ({ req }) => {
		const allowedRoles = [AuthRole.ADMIN, AuthRole.GUEST, AuthRole.USER]
		const { role } = authenticateRequest(req, allowedRoles)

		const isPublished = role !== AuthRole.ADMIN
		const [list, count] = await listProductBrandV1({ filter: { isPublished } })

		return { count, list: serializeBrandListV1(list, role) }
	},
})
