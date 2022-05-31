import { serverConfigs } from "@core/configs/server.configs"
import { createDatabaseSession } from "."

export async function truncateDatabase() {
	if (serverConfigs.environment !== "test") {
		throw new Error("truncating database is only allowed in test environment")
	}

	const session = createDatabaseSession()
	await session.withTransaction(async (_runner) => {})
}
