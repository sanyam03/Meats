import { createDatabaseSession, DatabaseSession } from "@core/database"
import { List } from "@core/types"
import { FindConditions } from "typeorm"
import { ProductBrand, ProductBrandId } from "./ProductBrand.entity"

export async function listProductBrandV1(
	{
		filter: { id, title, isPublished } = {},
	}: { filter?: { id?: ProductBrandId; title?: string; isPublished?: boolean } } = {},

	existingSession?: DatabaseSession,
): Promise<List<ProductBrand>> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const whereQuery: FindConditions<ProductBrand> = {}
		if (id) whereQuery.id = id
		if (title) whereQuery.title = title
		if (isPublished) whereQuery.isPublished = isPublished

		return await runner.manager.findAndCount(ProductBrand, {
			where: whereQuery,
			order: { title: "ASC" },
		})
	})
}
