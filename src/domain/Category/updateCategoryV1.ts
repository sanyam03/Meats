import { createDatabaseSession, DatabaseSession } from "@core/database"
import { getOneByIdOrThrow } from "@domain/shared/helpers"
import _ from "lodash"
import { Category, CategoryId } from "./Category.entity"
import { checkCategoryTitleAvailabilityV1 } from "./checkCategoryNameAvailabilityV1"

export async function updateCategoryV1(
	{
		filter,
		update,
	}: { filter: { id: CategoryId }; update: { title?: string; description?: string } },
	existingSession?: DatabaseSession,
): Promise<Category> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const category = await getOneByIdOrThrow(runner, {
			entity: Category,
			id: filter.id,
			errorMessage: "Category not found",
		})

		if (update.title) {
			if (update.title !== category.title) {
				await checkCategoryTitleAvailabilityV1({ title: update.title }, session)
				category.title = update.title
			}
		}
		if (!_.isUndefined(update.description)) {
			category.description = update.description
		}

		return await runner.manager.save(category)
	})
}
