import { createDatabaseSession, DatabaseSession } from "@core/database"
import { Admin } from "./Admin.entity"
import { checkAdminUsernameAvailabilityV1 } from "./checkAdminUsernameAvailabilityV1"

export async function createAdminV1(
	{ username, password }: { username: string; password: string },
	existingSession?: DatabaseSession,
): Promise<Admin> {
	const session = createDatabaseSession(existingSession)
	return await session.withTransaction(async (runner) => {
		await checkAdminUsernameAvailabilityV1({ username }, session)
		const admin = await new Admin().build({ username, password })
		return await runner.manager.save(admin)
	})
}
