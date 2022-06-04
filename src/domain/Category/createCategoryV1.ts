import { createDatabaseSession, DatabaseSession } from "@core/database"
import { findOneByIdOrThrow } from "@domain/shared/helpers"
import { Category, CategoryId } from "./Category.entity"
import { checkCategoryNameAvailabilityV1 } from "./checkCategoryNameAvailabilityV1"

export async function createCategoryV1(
	payload: {
		title: string
		description?: string
		parentCategoryId?: CategoryId | null
	},
	existingSession?: DatabaseSession,
): Promise<Category> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		await checkCategoryNameAvailabilityV1(payload, session)

		let parentCategory = null
		if (payload.parentCategoryId) {
			parentCategory = await findOneByIdOrThrow(runner, {
				entity: Category,
				id: payload.parentCategoryId,
				errorMessage: "Parent category not found",
			})
		}

		const category = new Category().build({ ...payload, parentCategory })
		return await runner.manager.save(category)
	})
}
