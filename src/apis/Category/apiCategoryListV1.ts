import { HttpApi } from "@core/http"
import { dumpCategoryV1 } from "@domain/Category/dumpCategoryV1"
import { listCategoryV1 } from "@domain/Category/listCategoryV1"

export const apiCategoryListV1 = new HttpApi({
	endpoint: "/category/list/v1",
	handler: async () => {
		const [list, count] = await listCategoryV1()
		return { count, list: list.map((el) => dumpCategoryV1(el)) }
	},
})
