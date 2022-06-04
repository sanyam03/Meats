import { AuthRole } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { Category } from "@domain/Category/Category.entity"
import { expectCategoryV1Schema } from "@domain/Category/test/expectCategoryV1Schema"
import { generateCategory } from "@domain/Category/test/generateCategory"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/list/v1"

describe(`API: ${endpoint}`, () => {
	let categories: Category[] = []

	before(async () => {
		await truncateDatabase()

		categories = [
			await generateCategory(),
			await generateCategory(),
			await generateCategory(),
			await generateCategory(),
		]
	})

	/**
	 * Success cases
	 */

	for (const role of [AuthRole.ADMIN]) {
		//TODO: with guest and user  roles

		it(`Success with role(${role})`, async () => {
			const auth = await generateAdminAuth()
			const res = await httpApiRequest({ endpoint, bearerToken: auth.accessToken })
			expect(res).exist
			expect(res.count).equal(categories.length)
			expect(res.list).length(categories.length)
			for (const el of res.list) expectCategoryV1Schema(el, role)
		})
	}
})
