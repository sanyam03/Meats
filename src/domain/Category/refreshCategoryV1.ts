import { createDatabaseSession, DatabaseSession } from "@core/database"
import { getOneByIdOrThrow } from "@domain/shared/helpers"
import { Category, CategoryId } from "./Category.entity"

export async function refreshCategoryV1(
	{ id }: { id: CategoryId },
	existingSession?: DatabaseSession,
): Promise<Category> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const [category, countSubCategories] = await Promise.all([
			getOneByIdOrThrow(runner, { entity: Category, id }),
			runner.manager.count(Category, { where: { parentCategory: { id } } }),
		])

		category.countSubCategories = countSubCategories
		return await runner.manager.save(category)
	})
}
