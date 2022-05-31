import { createDatabaseSession, DatabaseSession } from "@core/database"
import { Category } from "./Category.entity"
import { checkCategoryNameAvailabilityV1 } from "./checkCategoryNameAvailabilityV1"

export async function createCategoryV1(
	{ title }: { title: string },
	existingSession?: DatabaseSession,
): Promise<Category> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		await checkCategoryNameAvailabilityV1({ title }, session)
		const category = new Category().build({ title })
		return await runner.manager.save(category)
	})
}
