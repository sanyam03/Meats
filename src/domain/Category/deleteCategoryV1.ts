import { createDatabaseSession, DatabaseSession } from "@core/database"
import { getOneByIdOrThrow } from "@domain/shared/helpers"
import { Category, CategoryId } from "./Category.entity"

export async function deleteCategoryV1(
	{ id }: { id: CategoryId },
	existingSession?: DatabaseSession,
): Promise<void> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const category = await getOneByIdOrThrow(runner, {
			entity: Category,
			id,
			errorMessage: "Category not found",
		})

		await runner.manager.remove(category)
	})
}
