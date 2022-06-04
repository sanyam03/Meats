import { HttpApi } from "@core/http"
import { serializeCategoryV1 } from "@domain/Category/serializeCategoryV1"
import { listCategoryV1 } from "@domain/Category/listCategoryV1"
import { AuthRole } from "@core/auth"

export const apiCategoryListV1 = new HttpApi({
	endpoint: "/category/list/v1",
	handler: async () => {
		const [list, count] = await listCategoryV1()
		return { count, list: list.map((el) => serializeCategoryV1(el, AuthRole.USER)) }
	},
})
