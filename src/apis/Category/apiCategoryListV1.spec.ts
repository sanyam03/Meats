import { truncateDatabase } from "@core/database/truncateDatabase"
import { Category } from "@domain/Category/Category.entity"
import { expectCategoryV1Schema } from "@domain/Category/test/expectCategoryV1Schema"
import { generateCategory } from "@domain/Category/test/generateCategory"
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

	it(`Success`, async () => {
		const res = await httpApiRequest({ endpoint })
		expect(res).exist
		expect(res.count).equal(categories.length)
		expect(res.list).length(categories.length)
		for (const el of res.list) expectCategoryV1Schema(el)
	})
})
