import { createDatabaseSession, DatabaseSession } from "@core/database"
import { getOneByIdOrThrow } from "@domain/shared/helpers"
import { Category, CategoryId } from "./Category.entity"
import { checkCategoryTitleAvailabilityV1 } from "./checkCategoryNameAvailabilityV1"
import { refreshCategoryV1 } from "./refreshCategoryV1"

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
		await checkCategoryTitleAvailabilityV1(payload, session)

		let parentCategory = null
		if (payload.parentCategoryId) {
			parentCategory = await getOneByIdOrThrow(runner, {
				entity: Category,
				id: payload.parentCategoryId,
				errorMessage: "Parent category not found",
			})
		}

		const category = new Category().build({ ...payload, parentCategory })
		const createdCategory = await runner.manager.save(category)

		if (createdCategory.parentCategoryId) {
			await refreshCategoryV1({ id: createdCategory.parentCategoryId }, session)
		}
		return createdCategory
	})
}
