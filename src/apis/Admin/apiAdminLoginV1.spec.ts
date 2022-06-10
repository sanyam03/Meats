import { AuthRole, validateAccessToken } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { HttpStatusCode } from "http-rest-api"
import { UnPromise } from "@core/types"
import { generateAdmin } from "@domain/Admin/test/generateAdmin"
import { generateAdminUsername } from "@domain/Admin/test/generateAdminUsername"
import { randomPassword } from "@domain/shared/test/randomGenerators"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/admin/login/v1"

describe(`API: ${endpoint}`, () => {
	let admin: UnPromise<ReturnType<typeof generateAdmin>>

	before(async () => {
		await truncateDatabase()
		admin = await generateAdmin()
	})

	/**
	 * Fail Validation cases
	 */

	it(`Fail validation without username`, async () => {
		await httpApiRequest({
			endpoint,
			body: { password: admin.password },
			expectedStatusCode: HttpStatusCode.BAD_REQUEST,
		})
	})

	it(`Fail validation without password`, async () => {
		await httpApiRequest({
			endpoint,
			body: { username: admin.username },
			expectedStatusCode: HttpStatusCode.BAD_REQUEST,
		})
	})

	/**
	 * Success cases
	 */

	it(`Success`, async () => {
		const { username, password } = admin

		const res = await httpApiRequest({ endpoint, body: { username, password } })
		expect(res).exist
		expect(res.accessToken).exist

		const auth = validateAccessToken(res.accessToken)
		expect(auth.role).equal(AuthRole.ADMIN)
		expect(auth.id).equal(admin.id)
	})

	/**
	 * Fail Cases
	 */

	it(`Fail with wrong username`, async () => {
		const username = generateAdminUsername()
		await httpApiRequest({
			endpoint,
			body: { username, password: admin.password },
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})

	it(`Fail with wrong password`, async () => {
		const password = randomPassword()
		await httpApiRequest({
			endpoint,
			body: { username: admin.username, password },
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})
})
