import { createDatabaseSession, DatabaseSession } from "@core/database"
import { checkBrandTitleAvailabilityV1 } from "./checkProductBrandNameAvailabilityV1"
import { ProductBrand } from "./ProductBrand.entity"

export async function createProductBrandV1(
	payload: {
		title: string
		description?: string
	},
	existingSession?: DatabaseSession,
): Promise<ProductBrand> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		await checkBrandTitleAvailabilityV1(payload, session)

		const productBrand = new ProductBrand().build({ ...payload })
		const createdBrand = await runner.manager.save(productBrand)

		return createdBrand
	})
}
