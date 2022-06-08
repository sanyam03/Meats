import { AuthRole } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "@core/http"
import { Category } from "@domain/Category/Category.entity"
import { listCategoryV1 } from "@domain/Category/listCategoryV1"
import { expectCategoryV1Schema } from "@domain/Category/test/expectCategoryV1Schema"
import { generateCategory } from "@domain/Category/test/generateCategory"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/parentCategory/update/v1"

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

	/**
	 * Success cases
	 */
	for (const isCategoryHasParent of [false, true]) {
		for (const isUpdateParentCategoryNull of [false, true]) {
			let desc = "Success "
			desc += isUpdateParentCategoryNull
				? "remove parent category from "
				: "update parent category to "
			desc += isCategoryHasParent
				? "category with parent"
				: "category without parent"

			it(desc, async () => {
				const category = await generateCategory({
					withParentCategory: isCategoryHasParent,
				})

				let oldParentCategoryBeforeUpdate: Category | null = null
				if (category.parentCategoryId) {
					const [[oldParentCategory]] = await listCategoryV1({
						filter: { id: category.parentCategoryId },
					})
					oldParentCategoryBeforeUpdate = oldParentCategory
				}

				const parentCategory = isUpdateParentCategoryNull
					? null
					: await generateCategory()
				const parentCategoryId = parentCategory?.id ?? null

				const res = await httpApiRequest({
					endpoint,
					bearerToken,
					body: { id: category.id, parentCategoryId },
				})
				expect(res).exist
				expectCategoryV1Schema(res, AuthRole.ADMIN)
				expect(res.id).equal(category.id)
				expect(res.parentCategoryId).equal(parentCategoryId)

				if (oldParentCategoryBeforeUpdate && category.parentCategoryId) {
					const [[oldParentCategoryAfterUpdate]] = await listCategoryV1({
						filter: { id: category.parentCategoryId },
					})
					expect(oldParentCategoryAfterUpdate).exist
					expect(oldParentCategoryAfterUpdate.countSubCategories).equal(
						oldParentCategoryBeforeUpdate.countSubCategories - 1,
					)
				}

				if (parentCategory) {
					const [[parentCategoryAfterUpdate]] = await listCategoryV1({
						filter: { id: parentCategory.id },
					})
					expect(parentCategoryAfterUpdate).exist
					expect(parentCategoryAfterUpdate.countSubCategories).equal(
						parentCategory.countSubCategories + 1,
					)
				}
			})
		}
	}
})
