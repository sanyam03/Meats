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

		let listOfCategoriesToBeRefreshed: Category[] = []
		if (category.parentCategory) {
			listOfCategoriesToBeRefreshed.push(category.parentCategory)
		}

		if (parentCategoryId) {
			const parentCategory = await getOneByIdOrThrow(runner, {
				entity: Category,
				id,
				errorMessage: "Parent category not found",
			})

			category.parentCategory = parentCategory
			listOfCategoriesToBeRefreshed.push(parentCategory)
		} else {
			category.parentCategory = null
		}

		await runner.manager.save(category)

		for (const { id } of listOfCategoriesToBeRefreshed) {
			await refreshCategoryV1({ id }, session)
		}
		return category
	})
}
