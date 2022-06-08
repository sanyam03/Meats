import { createDatabaseSession, DatabaseSession } from "@core/database"
import { getOneByIdOrThrow } from "@domain/shared/helpers"
import { Category, CategoryId } from "./Category.entity"
import { refreshCategoryV1 } from "./refreshCategoryV1"

export async function updateCategoryParentCategoryV1(
	{ id, parentCategoryId }: { id: CategoryId; parentCategoryId: CategoryId | null },
	existingSession?: DatabaseSession,
): Promise<Category> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const category = await getOneByIdOrThrow(runner, { entity: Category, id })

		const isParentCategorySame = category.parentCategoryId
			? category.parentCategoryId === parentCategoryId
			: parentCategoryId === null
		if (isParentCategorySame) return category

		let listOfCategoryIdsToBeRefreshed: CategoryId[] = []
		if (category.parentCategoryId) {
			listOfCategoryIdsToBeRefreshed.push(category.parentCategoryId)
		}

		if (parentCategoryId) {
			const parentCategory = await getOneByIdOrThrow(runner, {
				entity: Category,
				id: parentCategoryId,
				errorMessage: "Parent category not found",
			})

			category.parentCategory = parentCategory
			listOfCategoryIdsToBeRefreshed.push(parentCategory.id)
		} else {
			category.parentCategory = null
		}

		const updatedCategory = await runner.manager.save(category)

		for (const id of listOfCategoryIdsToBeRefreshed) {
			await refreshCategoryV1({ id }, session)
		}
		return updatedCategory
	})
}
