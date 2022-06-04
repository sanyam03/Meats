import { createDatabaseSession, DatabaseSession } from "@core/database"
import { List } from "@core/types"
import { FindConditions } from "typeorm"
import { Category, CategoryId } from "./Category.entity"

export async function listCategoryV1(
	{
		filter: { id, title, categoryUrl } = {},
	}: { filter?: { id?: CategoryId; title?: string; categoryUrl?: string } } = {},
	existingSession?: DatabaseSession,
): Promise<List<Category>> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const whereQuery: FindConditions<Category> = {}
		if (id) whereQuery.id = id
		if (title) whereQuery.title = title
		if (categoryUrl) whereQuery.categoryUrl = categoryUrl

		return await runner.manager.findAndCount(Category, {
			where: whereQuery,
			order: { title: "ASC" },
		})
	})
}
