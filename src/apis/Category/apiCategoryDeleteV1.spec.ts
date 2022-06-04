import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "@core/http"
import { Category } from "@domain/Category/Category.entity"
import { listCategoryV1 } from "@domain/Category/listCategoryV1"
import { generateCategory } from "@domain/Category/test/generateCategory"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/delete/v1"

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
	 * Fail authentication cases
	 */

	it(`Fail authentication without auth token`, async () => {
		await httpApiRequest({ endpoint, expectedStatusCode: HttpStatusCode.FORBIDDEN })
	})

	/**
	 * Success cases
	 */

	it(`Success deleting all categories one by one`, async () => {
		const auth = await generateAdminAuth()
		const bearerToken = auth.accessToken

		let countCategories = categories.length
		for (const { id } of categories) {
			const res = await httpApiRequest({
				endpoint,
				bearerToken,
				body: { id },
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty
			countCategories--

			const [[categories], [[deletedCategory]]] = await Promise.all([
				listCategoryV1(),
				listCategoryV1({ filter: { id } }),
			])
			expect(categories).length(countCategories)
			expect(deletedCategory).undefined
		}
	})
})
