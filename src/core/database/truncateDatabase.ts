import { serverConfigs } from "@core/configs/server.configs"
import { Admin } from "@domain/Admin/Admin.entity"
import { Category } from "@domain/Category/Category.entity"
import { ProductBrand } from "@domain/ProductBrand/ProductBrand.entity"
import { createDatabaseSession } from "."

export async function truncateDatabase() {
	if (serverConfigs.environment !== "test") {
		throw new Error("truncating database is only allowed in test environment")
	}

	const session = createDatabaseSession()
	await session.withTransaction(async (runner) => {
		await runner.manager.delete(Admin, {})
		await runner.manager.delete(Category, {})
		await runner.manager.delete(ProductBrand, {})
	})
}
