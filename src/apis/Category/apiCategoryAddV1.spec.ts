import { AccessToken, AuthRole } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "@core/http"
import { listCategoryV1 } from "@domain/Category/listCategoryV1"
import { expectCategoryV1Schema } from "@domain/Category/test/expectCategoryV1Schema"
import {
	generateCategory,
	getAvailableCategoryTitle,
} from "@domain/Category/test/generateCategory"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { randProductDescription } from "@ngneat/falso"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/add/v1"

describe(`API: ${endpoint}`, () => {
	let bearerToken: AccessToken

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

	/**
	 * Fail validation cases
	 */

	it(`Fail validation without title`, async () => {
		await httpApiRequest({
			endpoint,
			bearerToken,
			expectedStatusCode: HttpStatusCode.BAD_REQUEST,
		})
	})

	/**
	 * Success cases
	 */
	for (const withParentCategory of [false, true]) {
		for (const withDesc of [false, true]) {
			let desc = "Success"
			if (withDesc && withParentCategory) {
				desc += " with description & parent-category"
			} else if (withDesc) {
				desc += " with description"
			} else if (withParentCategory) {
				desc += " with parent-category"
			}

			it(desc, async () => {
				const parentCategoryId = withParentCategory
					? (await generateCategory()).id
					: undefined
				const title = await getAvailableCategoryTitle()
				const description = withDesc ? randProductDescription() : undefined

				const res = await httpApiRequest({
					endpoint,
					bearerToken,
					body: { title, description, parentCategoryId },
					expectedStatusCode: HttpStatusCode.CREATED,
				})
				expect(res).exist
				expectCategoryV1Schema(res, AuthRole.ADMIN)
				expect(res.title).equal(title)
				expect(res.description).equal(description || "")
				expect(res.parentCategoryId).equal(parentCategoryId || null)

				if (parentCategoryId) {
					const [[parentCategory]] = await listCategoryV1({
						filter: { id: parentCategoryId },
					})
					expect(parentCategory.countSubCategories).equal(1)
				}
			})
		}
	}

	/**
	 * Fail Cases
	 */

	it(`Fail with already exist title`, async () => {
		const [[category]] = await listCategoryV1()

		await httpApiRequest({
			endpoint,
			bearerToken,
			body: { title: category.title },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
