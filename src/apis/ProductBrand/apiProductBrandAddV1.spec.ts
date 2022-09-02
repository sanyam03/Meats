import { AccessToken, AuthRole } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "http-rest-api"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { randProductDescription } from "@ngneat/falso"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"
import { listProductBrandV1 } from "@domain/ProductBrand/listProductBrandV1"
import { expectBrandV1Schema } from "@domain/ProductBrand/test/expectProductBrandV1Schema"
import { getAvailableBrandTitle } from "@domain/ProductBrand/test/generateProductBrand"

const endpoint = "/productBrand/add/v1"

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

	for (const withDesc of [false, true]) {
		let desc = "Success"
		if (withDesc) {
			desc += " with description"
		}

		it(desc, async () => {
			const title = await getAvailableBrandTitle()
			const description = withDesc ? randProductDescription() : undefined

			const res = await httpApiRequest({
				endpoint,
				bearerToken,
				body: { title, description },
				expectedStatusCode: HttpStatusCode.CREATED,
			})
			expect(res).exist
			expectBrandV1Schema(res, AuthRole.ADMIN)
			expect(res.title).equal(title)
			expect(res.description).equal(description || "")
		})
	}

	/**
	 * Fail Cases
	 */

	it(`Fail with already exist title`, async () => {
		const [[brand]] = await listProductBrandV1()

		await httpApiRequest({
			endpoint,
			bearerToken,
			body: { title: brand.title },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
