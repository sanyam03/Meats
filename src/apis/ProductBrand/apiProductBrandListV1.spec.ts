import { AuthRole } from "@core/auth"
import { truncateDatabase } from "@core/database/truncateDatabase"
import { ProductBrand } from "@domain/ProductBrand/ProductBrand.entity"
import { expectBrandV1Schema } from "@domain/ProductBrand/test/expectProductBrandV1Schema"
import { generateBrand } from "@domain/ProductBrand/test/generateProductBrand"
import { generateAdminAuth } from "@domain/shared/test/generateAdminAuth"
import { httpApiRequest } from "@utils/test"
import { expect } from "chai"

const endpoint = "/brand/list/v1"

describe(`API: ${endpoint}`, () => {
	let brands: ProductBrand[] = []

	before(async () => {
		await truncateDatabase()

		brands = [
			await generateBrand(),
			await generateBrand(),
			await generateBrand(),
			await generateBrand(),
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
			expect(res.count).equal(brands.length)
			expect(res.list).length(brands.length)
			for (const el of res.list) expectBrandV1Schema(el, role)
		})
	}
})
