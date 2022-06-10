import { AuthRole } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "http-rest-api"
import { expectCategoryV1Schema } from "@domain/Category/test/expectCategoryV1Schema"
import { generateCategory } from "@domain/Category/test/generateCategory"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { randProductCategory, randProductDescription } from "@ngneat/falso"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/update/v1"

describe(`API: ${endpoint}`, () => {
	let bearerToken: string

	before(async () => {
		await truncateDatabase()

		const auth = await generateAdminAuth()
		bearerToken = auth.accessToken
	})

	/**
	 * Fail authentication cases
	 */
	it(`Fail authentication without auth token`, async () => {
		await httpApiRequest({ endpoint, expectedStatusCode: HttpStatusCode.FORBIDDEN })
	})

	const possibilities: [string, { title?: string; description?: string }][] = [
		["update title", { title: randProductCategory() }],
		["update description", { description: randProductDescription() }],
		["update description(empty)", { description: "" }],
	]

	/**
	 * Success cases
	 */

	for (const [desc, toUpdate] of possibilities) {
		it(`Success ${desc}`, async () => {
			const category = await generateCategory()

			const res = await httpApiRequest({
				endpoint,
				bearerToken,
				body: { filter: { id: category.id }, update: toUpdate },
			})
			expect(res).exist
			expectCategoryV1Schema(res, AuthRole.ADMIN)
			expect(res.id).equal(category.id)

			const expectedTitle = toUpdate.title ?? category.title
			expect(res.title).equal(expectedTitle)

			const expectedDescription = toUpdate.description ?? category.description
			expect(res.description).equal(expectedDescription)

			expect(res.updatedAt).not.equal(res.createdAt)
		})
	}
})
