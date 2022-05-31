import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "@core/http"
import { randProductCategory } from "@ngneat/falso"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/category/add/v1"

describe(`API: ${endpoint}`, () => {
	const title = randProductCategory()

	before(async () => {
		await truncateDatabase()
	})

	/**
	 * Fail Validation cases
	 */

	it(`Fail validation without title`, async () => {
		await httpApiRequest({ endpoint, expectedStatusCode: HttpStatusCode.BAD_REQUEST })
	})

	/**
	 * Success cases
	 */

	it(`Success`, async () => {
		const res = await httpApiRequest({
			endpoint,
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
			body: { title },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
