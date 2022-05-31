import { createDatabaseSession, DatabaseSession } from "@core/database"
import { List } from "@core/types"
import { FindConditions } from "typeorm"
import { Admin, AdminId } from "./Admin.entity"

export async function listAdminV1(
	{
		filter: { id, username } = {},
	}: { filter?: { id?: AdminId; username?: string } } = {},
	existingSession?: DatabaseSession,
): Promise<List<Admin>> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		const whereQuery: FindConditions<Admin> = {}
		if (id) whereQuery.id = id
		if (username) whereQuery.username = username.toLowerCase()

		return await runner.manager.findAndCount(Admin, {
			where: whereQuery,
			order: { username: "ASC" },
		})
	})
}
