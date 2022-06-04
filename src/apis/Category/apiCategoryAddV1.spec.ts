import { AccessToken } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "@core/http"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { randProductCategory } from "@ngneat/falso"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/add/v1"

describe(`API: ${endpoint}`, () => {
	let bearerToken: AccessToken
	const title = randProductCategory()

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

	it(`Success`, async () => {
		const res = await httpApiRequest({
			endpoint,
			bearerToken,
			body: { title },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.title).equal(title)
	})

	/**
	 * Fail Cases
	 */

	it(`Fail with already exist title`, async () => {
		await httpApiRequest({
			endpoint,
			bearerToken,
			body: { title },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
